(() => {
  'use strict';

  const VERSION = 'lucky-machine-v1.3';
  const TAU = Math.PI * 2;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + ((b - a) * t);
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const REVEAL_TIMES = [3.30, 5.80, 8.30];
  const SETTLE_START = 8.34;
  const COMPLETE_TIME = 10.42;

  function mulberry32(seed) {
    let value = seed >>> 0;
    return () => {
      value = (value + 0x6D2B79F5) >>> 0;
      let t = value;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function roundedRectPath(ctx, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') { ctx.roundRect(x, y, width, height, r); return; }
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
  }

  class LuckyOracleMachine {
    constructor(canvas) {
      if (!(canvas instanceof HTMLCanvasElement)) throw new Error('LuckyOracleMachine requires a canvas.');
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { alpha: true });
      this.width = 360;
      this.height = 470;
      this.dpr = 1;
      this.active = false;
      this.frame = null;
      this.lastFrame = performance.now();
      this.state = 'idle';
      this.phase = 'idle';
      this.startedAt = 0;
      this.selected = [];
      this.callbacks = {};
      this.revealFlags = [false, false, false];
      this.timers = [];
      this.reducedVisible = 0;
      this.dialAngle = 0;
      this.balls = [];
      this.layoutNonce = 0;
      this.settleTargetReady = false;
      this.resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(() => this.resize()) : null;
      this.resizeObserver?.observe(canvas);
      window.addEventListener('resize', () => this.resize(), { passive: true });
      this.resize();
      this.resetBalls();
      this.draw(performance.now());
    }

    geometry() {
      const w = this.width;
      const h = this.height;
      // Keep the machine footprint unchanged. Only the glass chamber grows a few percent,
      // while its 30 mixing orbs become smaller than the three result orbs in the tray.
      const r = Math.min(w * 0.33, h * 0.255);
      return {
        cx: w * 0.5,
        cy: h * 0.36,
        chamberR: r,
        ballR: Math.max(16, Math.min(w, h) * 0.053),
        mixBallR: Math.max(10.5, Math.min(w, h) * 0.034),
        gateX: w * 0.5,
        gateY: h * 0.36 + r * 0.88,
        trayY: h * 0.855,
        slotXs: [w * 0.29, w * 0.5, w * 0.71]
      };
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const width = Math.max(280, rect.width || 360);
      const height = Math.max(370, rect.height || width * 1.30);
      this.width = width;
      this.height = height;
      this.dpr = Math.min(2.5, Math.max(1, window.devicePixelRatio || 1));
      const pxW = Math.round(width * this.dpr);
      const pxH = Math.round(height * this.dpr);
      if (this.canvas.width !== pxW || this.canvas.height !== pxH) {
        this.canvas.width = pxW;
        this.canvas.height = pxH;
      }
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      if (!this.balls.length) this.resetBalls();
      this.draw(performance.now());
    }

    nextLayoutSeed() {
      this.layoutNonce = (this.layoutNonce + 1) >>> 0;
      const clock = (Date.now() & 0xffffffff) >>> 0;
      return (clock ^ Math.imul(this.layoutNonce, 0x9E3779B1)) >>> 0;
    }

    createRestingLayout(count, g, seed = this.nextLayoutSeed()) {
      const rng = mulberry32(seed);
      const radius = g.mixBallR;
      const maxDistance = g.chamberR - (radius * 1.08);
      const minimum = radius * 2.05;
      const points = Array.from({ length: count }, (_, index) => {
        const angle = rng() * TAU;
        const distance = Math.sqrt(rng()) * maxDistance * 0.78;
        return {
          x: g.cx + Math.cos(angle) * distance,
          y: g.cy + Math.sin(angle) * distance * 0.72 - (g.chamberR * 0.18),
          vx: (rng() - 0.5) * g.chamberR * 0.12,
          vy: (rng() - 0.5) * g.chamberR * 0.08,
          rotation: (rng() * TAU) + (index * 0.07)
        };
      });

      const constrainToChamber = (point) => {
        const dx = point.x - g.cx;
        const dy = point.y - g.cy;
        const distance = Math.max(0.001, Math.hypot(dx, dy));
        if (distance <= maxDistance) return;
        const nx = dx / distance;
        const ny = dy / distance;
        point.x = g.cx + (nx * maxDistance);
        point.y = g.cy + (ny * maxDistance);
        const normalSpeed = (point.vx * nx) + (point.vy * ny);
        if (normalSpeed > 0) {
          point.vx -= normalSpeed * nx * 1.12;
          point.vy -= normalSpeed * ny * 1.12;
        }
      };

      const solveContacts = () => {
        for (let i = 0; i < points.length; i += 1) {
          for (let j = i + 1; j < points.length; j += 1) {
            const a = points[i];
            const b = points[j];
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            let distance = Math.hypot(dx, dy);
            if (distance < 0.001) {
              const angle = rng() * TAU;
              dx = Math.cos(angle);
              dy = Math.sin(angle);
              distance = 1;
            }
            if (distance >= minimum) continue;
            const nx = dx / distance;
            const ny = dy / distance;
            const overlap = (minimum - distance) * 0.505;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
            const relative = ((b.vx - a.vx) * nx) + ((b.vy - a.vy) * ny);
            if (relative < 0) {
              const impulse = -relative * 0.34;
              a.vx -= impulse * nx;
              a.vy -= impulse * ny;
              b.vx += impulse * nx;
              b.vy += impulse * ny;
            }
          }
        }
      };

      // Position-based granular settling: gravity + circular wall + repeated
      // equal-radius contact projection. This produces a stable, irregular pile
      // without using an ordered ring/grid as the visible resting state.
      const dt = 1 / 60;
      for (let step = 0; step < 420; step += 1) {
        points.forEach((point) => {
          point.vy += g.chamberR * 3.55 * dt;
          point.vx *= 0.972;
          point.vy *= 0.972;
          point.x += point.vx * dt;
          point.y += point.vy * dt;
        });
        for (let pass = 0; pass < 4; pass += 1) {
          points.forEach(constrainToChamber);
          solveContacts();
        }
      }

      // Final projection removes the tiny residual overlaps created by the last
      // contact solve at the curved wall, then the balls are frozen at rest.
      for (let pass = 0; pass < 36; pass += 1) {
        points.forEach(constrainToChamber);
        solveContacts();
      }
      points.forEach(constrainToChamber);
      return points;
    }

    applyRestingLayout(balls, g = this.geometry()) {
      const layout = this.createRestingLayout(balls.length, g);
      balls.forEach((ball, index) => {
        const point = layout[index];
        ball.x = point.x;
        ball.y = point.y;
        ball.vx = 0;
        ball.vy = 0;
        ball.rotation = point.rotation;
        ball.spin = 0;
      });
    }

    stabilizeLiveBalls(balls, g = this.geometry()) {
      const minimum = g.mixBallR * 2.03;
      const maxDistance = g.chamberR - (g.mixBallR * 1.03);
      for (let pass = 0; pass < 60; pass += 1) {
        balls.forEach((ball) => {
          const dx = ball.x - g.cx;
          const dy = ball.y - g.cy;
          const distance = Math.max(0.001, Math.hypot(dx, dy));
          if (distance > maxDistance) {
            const nx = dx / distance;
            const ny = dy / distance;
            ball.x = g.cx + (nx * maxDistance);
            ball.y = g.cy + (ny * maxDistance);
          }
        });
        for (let i = 0; i < balls.length; i += 1) {
          for (let j = i + 1; j < balls.length; j += 1) {
            const a = balls[i];
            const b = balls[j];
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            let distance = Math.hypot(dx, dy);
            if (distance < 0.001) {
              dx = 1;
              dy = 0;
              distance = 1;
            }
            if (distance >= minimum) continue;
            const nx = dx / distance;
            const ny = dy / distance;
            const overlap = (minimum - distance) * 0.505;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
          }
        }
        balls.forEach((ball) => {
          const dx = ball.x - g.cx;
          const dy = ball.y - g.cy;
          const distance = Math.max(0.001, Math.hypot(dx, dy));
          if (distance <= maxDistance) return;
          const nx = dx / distance;
          const ny = dy / distance;
          ball.x = g.cx + (nx * maxDistance);
          ball.y = g.cy + (ny * maxDistance);
        });
      }
      balls.forEach((ball) => {
        ball.vx = 0;
        ball.vy = 0;
        ball.spin = 0;
      });
    }

    resetBalls() {
      const g = this.geometry();
      // Three physical copies of every digit: 0..9 × 3 = 30 orbs.
      // Number selection remains independent; these are only the physical presentation.
      this.balls = Array.from({ length: 30 }, (_, index) => ({
        number: index % 10,
        copyIndex: Math.floor(index / 10),
        x: g.cx,
        y: g.cy,
        vx: 0,
        vy: 0,
        rotation: 0,
        spin: 0,
        ejected: false,
        ejectedAt: 0,
        landed: false,
        startX: 0,
        startY: 0,
        slotIndex: -1
      }));
      this.applyRestingLayout(this.balls, g);
    }

    setActive(active) {
      this.active = Boolean(active);
      if (this.active && !this.frame) {
        this.lastFrame = performance.now();
        this.frame = requestAnimationFrame((now) => this.loop(now));
      }
      if (!this.active && this.frame) {
        cancelAnimationFrame(this.frame);
        this.frame = null;
      }
    }

    loop(now) {
      this.frame = null;
      if (!this.active) return;
      const dt = clamp((now - this.lastFrame) / 1000, 0, 0.035);
      this.lastFrame = now;
      this.update(now, dt);
      this.draw(now);
      this.frame = requestAnimationFrame((next) => this.loop(next));
    }

    cancel() {
      this.timers.forEach((timer) => clearTimeout(timer));
      this.timers = [];
      this.callbacks = {};
      this.state = 'idle';
      this.phase = 'idle';
      this.selected = [];
      this.revealFlags = [false, false, false];
      this.reducedVisible = 0;
      this.settleTargetReady = false;
      this.resetBalls();
      this.draw(performance.now());
    }

    play(numbers, options = {}) {
      if (!Array.isArray(numbers) || numbers.length !== 3) throw new Error('Lucky machine expects exactly three numbers.');
      this.cancel();
      this.selected = numbers.map(Number);
      this.callbacks = options;
      this.revealFlags = [false, false, false];
      this.reducedVisible = 0;
      this.resetBalls();

      if (options.reducedMotion) {
        this.state = 'reduced';
        this.phase = 'reveal';
        options.onPhase?.('reveal');
        [0, 1, 2].forEach((index) => {
          const timer = setTimeout(() => {
            const ball = this.balls.find((candidate) => candidate.number === this.selected[index] && !candidate.ejected);
            if (ball) {
              ball.ejected = true;
              ball.landed = true;
              ball.slotIndex = index;
            }
            this.reducedVisible = index + 1;
            options.onReveal?.(index, this.selected[index]);
            this.draw(performance.now());
            if (index === 2) {
              const done = setTimeout(() => {
                this.applyRestingLayout(this.balls.filter((candidate) => !candidate.ejected));
                this.state = 'result';
                options.onComplete?.();
                this.draw(performance.now());
              }, 820);
              this.timers.push(done);
            }
          }, REVEAL_TIMES[index] * 1000);
          this.timers.push(timer);
        });
        return;
      }

      const g = this.geometry();
      this.balls.forEach((ball, index) => {
        const angle = (index / this.balls.length) * TAU + 0.7;
        const speed = g.chamberR * (1.35 + ((index % 3) * 0.13));
        ball.vx = Math.cos(angle) * speed;
        ball.vy = Math.sin(angle) * speed;
        ball.spin = (index % 2 ? 1 : -1) * (3.2 + ((index % 10) * 0.18));
      });
      this.state = 'playing';
      this.phase = 'spin';
      this.startedAt = performance.now();
      this.callbacks.onPhase?.('spin');
    }

    showResult(numbers) {
      this.cancel();
      this.selected = numbers.map(Number);
      this.state = 'result';
      this.phase = 'result';
      this.reducedVisible = 3;
      this.resetBalls();
      this.selected.forEach((number, index) => {
        const ball = this.balls.find((candidate) => candidate.number === number && !candidate.ejected);
        if (ball) {
          ball.ejected = true;
          ball.landed = true;
          ball.slotIndex = index;
        }
      });
      // Restored/replayed results should look like a real machine that has stopped:
      // the 27 remaining orbs settle under gravity instead of returning to a ring.
      this.applyRestingLayout(this.balls.filter((ball) => !ball.ejected));
      this.draw(performance.now());
    }

    update(now, dt) {
      if (this.state !== 'playing') return;
      const elapsed = (now - this.startedAt) / 1000;
      const g = this.geometry();
      const settleProgress = clamp((elapsed - SETTLE_START) / (COMPLETE_TIME - SETTLE_START), 0, 1);
      const spinPower = lerp(0.78, 0, easeInOut(settleProgress));
      this.dialAngle += dt * (6.4 + (spinPower * 15.5));

      if (elapsed > (REVEAL_TIMES[0] - 0.22) && this.phase !== 'reveal') {
        this.phase = 'reveal';
        this.callbacks.onPhase?.('reveal');
      }
      REVEAL_TIMES.forEach((time, index) => {
        if (elapsed >= time && !this.revealFlags[index]) {
          this.revealFlags[index] = true;
          // Repeated results use a different physical copy of the same digit.
          const ball = this.balls.find((candidate) => candidate.number === this.selected[index] && !candidate.ejected);
          if (ball) {
            ball.ejected = true;
            ball.ejectedAt = now;
            ball.startX = ball.x;
            ball.startY = ball.y;
            ball.slotIndex = index;
          }
        }
      });

      const live = this.balls.filter((ball) => !ball.ejected);
      if (settleProgress > 0 && !this.settleTargetReady) {
        const targets = this.createRestingLayout(live.length, g);
        const orderedBalls = [...live].sort((a, b) => (a.x - b.x) || (a.y - b.y));
        const orderedTargets = [...targets].sort((a, b) => (a.x - b.x) || (a.y - b.y));
        orderedBalls.forEach((ball, index) => {
          ball.settleX = orderedTargets[index].x;
          ball.settleY = orderedTargets[index].y;
        });
        this.settleTargetReady = true;
      }

      live.forEach((ball) => {
        const dx = ball.x - g.cx;
        const dy = ball.y - g.cy;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const tangentX = -dy / distance;
        const tangentY = dx / distance;
        const swirl = g.chamberR * 3.05 * spinPower;
        const inward = g.chamberR * 1.18 * spinPower;
        ball.vx += (tangentX * swirl * dt) - ((dx / distance) * inward * dt);
        ball.vy += (tangentY * swirl * dt) - ((dy / distance) * inward * dt);
        // Gravity is always present; while the motor is strong it is secondary,
        // then it becomes dominant as the mechanism winds down.
        ball.vy += g.chamberR * 0.92 * dt;

        // Once the final reveal begins, motor force fades and gravity takes over.
        // Stronger damping models rolling/contact friction so the remaining orbs
        // naturally settle into an irregular pile instead of lining the glass wall.
        if (settleProgress > 0) {
          ball.vy += g.chamberR * 5.8 * settleProgress * dt;
          if (Number.isFinite(ball.settleX) && Number.isFinite(ball.settleY)) {
            const spring = 10.5 * easeInOut(settleProgress);
            ball.vx += (ball.settleX - ball.x) * spring * dt;
            ball.vy += (ball.settleY - ball.y) * spring * dt;
          }
          const settleDrag = Math.pow(0.028, dt * (1.35 + (settleProgress * 3.1)));
          ball.vx *= settleDrag;
          ball.vy *= settleDrag;
          ball.spin *= Math.pow(0.18, dt * (1 + (settleProgress * 2)));
        } else {
          const motorDrag = Math.pow(0.58, dt * 0.82);
          ball.vx *= motorDrag;
          ball.vy *= motorDrag;
        }

        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        ball.rotation += ball.spin * dt;

        const fromCenterX = ball.x - g.cx;
        const fromCenterY = ball.y - g.cy;
        const maxDistance = g.chamberR - (g.mixBallR * 1.03);
        const currentDistance = Math.hypot(fromCenterX, fromCenterY);
        if (currentDistance > maxDistance) {
          const nx = fromCenterX / currentDistance;
          const ny = fromCenterY / currentDistance;
          ball.x = g.cx + (nx * maxDistance);
          ball.y = g.cy + (ny * maxDistance);
          const dot = (ball.vx * nx) + (ball.vy * ny);
          const wallResponse = lerp(1.84, 1.06, settleProgress);
          ball.vx -= wallResponse * dot * nx;
          ball.vy -= wallResponse * dot * ny;
        }
      });

      // Equal-mass contact resolution keeps the orbs tactile. During the
      // settling phase we use extra position-solver passes so the final pile
      // cannot freeze with visible overlaps.
      const collisionPasses = settleProgress > 0 ? 4 : 1;
      for (let pass = 0; pass < collisionPasses; pass += 1) {
        for (let i = 0; i < live.length; i += 1) {
          for (let j = i + 1; j < live.length; j += 1) {
            const a = live[i];
            const b = live[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;
            const distance = Math.max(0.001, Math.hypot(dx, dy));
            const minimum = g.mixBallR * 2.03;
            if (distance >= minimum) continue;
            const nx = dx / distance;
            const ny = dy / distance;
            const overlap = (minimum - distance) * 0.505;
            a.x -= nx * overlap;
            a.y -= ny * overlap;
            b.x += nx * overlap;
            b.y += ny * overlap;
            const relative = ((b.vx - a.vx) * nx) + ((b.vy - a.vy) * ny);
            if (relative < 0) {
              const impulse = -relative * lerp(0.88, 0.22, settleProgress);
              a.vx -= impulse * nx;
              a.vy -= impulse * ny;
              b.vx += impulse * nx;
              b.vy += impulse * ny;
            }
          }
        }

        if (settleProgress > 0) {
          live.forEach((ball) => {
            const dx = ball.x - g.cx;
            const dy = ball.y - g.cy;
            const distance = Math.max(0.001, Math.hypot(dx, dy));
            const maxDistance = g.chamberR - (g.mixBallR * 1.03);
            if (distance <= maxDistance) return;
            const nx = dx / distance;
            const ny = dy / distance;
            ball.x = g.cx + (nx * maxDistance);
            ball.y = g.cy + (ny * maxDistance);
          });
        }
      }

      this.balls.filter((ball) => ball.ejected && ball.ejectedAt).forEach((ball) => {
        const age = (now - ball.ejectedAt) / 1000;
        const slotX = g.slotXs[ball.slotIndex];
        const slotY = g.trayY;
        if (age < 0.26) {
          const t = easeInOut(clamp(age / 0.26, 0, 1));
          ball.x = lerp(ball.startX, g.gateX, t);
          ball.y = lerp(ball.startY, g.gateY, t);
          ball.rotation += dt * 6;
        } else {
          const t = clamp((age - 0.26) / 0.56, 0, 1);
          const eased = easeOutCubic(t);
          ball.x = lerp(g.gateX, slotX, easeInOut(t));
          ball.y = lerp(g.gateY + 4, slotY, eased) - (Math.sin(Math.PI * t) * g.ballR * 0.34);
          ball.rotation += dt * (4.5 * (1 - t));
          if (t >= 1 && !ball.landed) {
            ball.landed = true;
            ball.x = slotX;
            ball.y = slotY;
            this.callbacks.onReveal?.(ball.slotIndex, ball.number);
          }
        }
      });

      if (elapsed >= COMPLETE_TIME) {
        this.stabilizeLiveBalls(this.balls.filter((ball) => !ball.ejected), g);
        this.state = 'result';
        this.phase = 'result';
        this.balls.filter((ball) => ball.ejected).forEach((ball) => {
          ball.ejectedAt = 0;
          ball.landed = true;
          ball.x = g.slotXs[ball.slotIndex];
          ball.y = g.trayY;
        });
        const complete = this.callbacks.onComplete;
        this.callbacks = {};
        complete?.();
      }
    }

    draw(now) {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      const g = this.geometry();
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      this.drawAtmosphere(ctx, w, h, now);
      this.drawPedestal(ctx, g, w, h);
      this.drawChamber(ctx, g, now);

      this.balls.forEach((ball) => {
        if (ball.ejected) return;
        // Resting orbs stay physically at rest; no decorative floating/bobbing.
        this.drawOrb(ctx, ball.x, ball.y, g.mixBallR, ball.number, ball.rotation, 0.93);
      });

      this.drawGlassHighlights(ctx, g);
      this.drawGateAndDial(ctx, g, now);
      this.drawTray(ctx, g, w, h);

      if (this.state === 'reduced') {
        for (let index = 0; index < this.reducedVisible; index += 1) {
          this.drawOrb(ctx, g.slotXs[index], g.trayY, g.ballR * 1.08, this.selected[index], 0, 1);
        }
      } else if (this.state === 'result') {
        this.selected.forEach((number, index) => this.drawOrb(ctx, g.slotXs[index], g.trayY, g.ballR * 1.08, number, 0, 1));
      } else {
        this.balls.filter((ball) => ball.ejected).forEach((ball) => {
          const bounce = ball.landed ? Math.sin((now - ball.ejectedAt) / 70) * Math.exp(-(now - ball.ejectedAt) / 280) * 2 : 0;
          const age = ball.ejectedAt ? Math.max(0, (now - ball.ejectedAt) / 1000) : 1;
          const grow = easeOutCubic(clamp(age / 0.38, 0, 1));
          const radius = lerp(g.mixBallR, g.ballR * 1.08, grow);
          this.drawOrb(ctx, ball.x, ball.y + bounce, radius, ball.number, ball.rotation, 1);
        });
      }

      this.drawForeground(ctx, g, w, h);
    }

    drawAtmosphere(ctx, w, h, now) {
      const glow = ctx.createRadialGradient(w * 0.5, h * 0.40, 10, w * 0.5, h * 0.40, w * 0.58);
      glow.addColorStop(0, 'rgba(238,202,124,.13)');
      glow.addColorStop(0.50, 'rgba(27,92,88,.09)');
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);
      const pulse = 0.035 + ((Math.sin(now / 1350) + 1) * 0.012);
      ctx.strokeStyle = `rgba(244,213,148,${pulse})`;
      ctx.lineWidth = 1;
      for (let radius = 36; radius < Math.min(w, h) * 0.48; radius += 36) {
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.42, radius, 0, TAU);
        ctx.stroke();
      }
    }

    drawPedestal(ctx, g, w, h) {
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.38)';
      ctx.shadowBlur = 28;
      const base = ctx.createLinearGradient(w * 0.25, 0, w * 0.75, 0);
      base.addColorStop(0, '#6c461c');
      base.addColorStop(0.18, '#c38b3d');
      base.addColorStop(0.50, '#f0ce7d');
      base.addColorStop(0.76, '#9d6729');
      base.addColorStop(1, '#4d3217');
      ctx.fillStyle = base;
      ctx.beginPath();
      ctx.moveTo(w * 0.33, g.cy + g.chamberR * 0.66);
      ctx.lineTo(w * 0.67, g.cy + g.chamberR * 0.66);
      ctx.lineTo(w * 0.75, h * 0.80);
      ctx.lineTo(w * 0.25, h * 0.80);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      ctx.strokeStyle = 'rgba(255,231,167,.48)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(w * 0.33, g.cy + g.chamberR * 0.70);
      ctx.lineTo(w * 0.67, g.cy + g.chamberR * 0.70);
      ctx.stroke();
    }

    drawChamber(ctx, g, now) {
      ctx.save();
      ctx.shadowColor = 'rgba(3,18,18,.48)';
      ctx.shadowBlur = 30;
      const ring = ctx.createLinearGradient(g.cx - g.chamberR, 0, g.cx + g.chamberR, 0);
      ring.addColorStop(0, '#5b3816');
      ring.addColorStop(0.17, '#b87931');
      ring.addColorStop(0.45, '#f4d58d');
      ring.addColorStop(0.63, '#c88e3d');
      ring.addColorStop(1, '#523216');
      ctx.strokeStyle = ring;
      ctx.lineWidth = g.ballR * 0.48;
      ctx.beginPath();
      ctx.arc(g.cx, g.cy, g.chamberR, 0, TAU);
      ctx.stroke();
      ctx.restore();

      const glass = ctx.createRadialGradient(g.cx - g.chamberR * 0.3, g.cy - g.chamberR * 0.4, 0, g.cx, g.cy, g.chamberR);
      glass.addColorStop(0, 'rgba(230,255,244,.13)');
      glass.addColorStop(0.42, 'rgba(75,142,134,.09)');
      glass.addColorStop(0.76, 'rgba(8,44,43,.22)');
      glass.addColorStop(1, 'rgba(2,24,25,.38)');
      ctx.fillStyle = glass;
      ctx.beginPath();
      ctx.arc(g.cx, g.cy, g.chamberR - g.ballR * 0.22, 0, TAU);
      ctx.fill();

      ctx.save();
      ctx.globalAlpha = 0.42;
      ctx.strokeStyle = 'rgba(246,220,157,.42)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 12; i += 1) {
        const angle = (i / 12) * TAU + (this.dialAngle * 0.025);
        const inner = g.chamberR * 0.76;
        const outer = g.chamberR * 0.88;
        ctx.beginPath();
        ctx.moveTo(g.cx + Math.cos(angle) * inner, g.cy + Math.sin(angle) * inner);
        ctx.lineTo(g.cx + Math.cos(angle) * outer, g.cy + Math.sin(angle) * outer);
        ctx.stroke();
      }
      ctx.restore();

      const topX = g.cx;
      const topY = g.cy - g.chamberR - (g.ballR * 0.72);
      ctx.fillStyle = '#d5a34f';
      ctx.strokeStyle = 'rgba(255,229,155,.75)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(topX, topY - g.ballR * 0.55);
      ctx.bezierCurveTo(topX - g.ballR * 0.9, topY - g.ballR * 0.12, topX - g.ballR * 0.65, topY + g.ballR * 0.3, topX, topY + g.ballR * 0.48);
      ctx.bezierCurveTo(topX + g.ballR * 0.65, topY + g.ballR * 0.3, topX + g.ballR * 0.9, topY - g.ballR * 0.12, topX, topY - g.ballR * 0.55);
      ctx.fill();
      ctx.stroke();
    }

    drawGlassHighlights(ctx, g) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(g.cx, g.cy, g.chamberR - g.ballR * 0.22, 0, TAU);
      ctx.clip();
      const shine = ctx.createLinearGradient(g.cx - g.chamberR, g.cy - g.chamberR, g.cx + g.chamberR, g.cy + g.chamberR);
      shine.addColorStop(0, 'rgba(255,255,255,.18)');
      shine.addColorStop(0.16, 'rgba(255,255,255,.02)');
      shine.addColorStop(0.64, 'rgba(255,255,255,0)');
      shine.addColorStop(1, 'rgba(255,240,205,.07)');
      ctx.fillStyle = shine;
      ctx.fillRect(g.cx - g.chamberR, g.cy - g.chamberR, g.chamberR * 2, g.chamberR * 2);
      ctx.strokeStyle = 'rgba(255,255,255,.21)';
      ctx.lineWidth = g.ballR * 0.22;
      ctx.beginPath();
      ctx.arc(g.cx - g.chamberR * 0.05, g.cy - g.chamberR * 0.03, g.chamberR * 0.73, Math.PI * 1.04, Math.PI * 1.47);
      ctx.stroke();
      ctx.restore();
    }

    drawGateAndDial(ctx, g, now) {
      const w = this.width;
      const gateW = g.ballR * 1.45;
      const gateH = g.ballR * 1.05;
      const gradient = ctx.createLinearGradient(g.gateX - gateW, 0, g.gateX + gateW, 0);
      gradient.addColorStop(0, '#5e3a18');
      gradient.addColorStop(0.5, '#e3b65d');
      gradient.addColorStop(1, '#6a4019');
      ctx.fillStyle = gradient;
      ctx.strokeStyle = 'rgba(255,232,165,.52)';
      ctx.lineWidth = 1;
      roundedRectPath(ctx, g.gateX - gateW / 2, g.gateY - gateH * 0.36, gateW, gateH, gateH * 0.22);
      ctx.fill();
      ctx.stroke();

      const dialX = w * 0.5;
      const dialY = g.gateY + g.ballR * 2.15;
      const dialR = g.ballR * 1.04;
      ctx.save();
      ctx.translate(dialX, dialY);
      ctx.rotate(this.dialAngle);
      const dial = ctx.createRadialGradient(-dialR * 0.25, -dialR * 0.3, 2, 0, 0, dialR);
      dial.addColorStop(0, '#f5d78b');
      dial.addColorStop(0.48, '#b47b32');
      dial.addColorStop(1, '#4c3015');
      ctx.fillStyle = dial;
      ctx.strokeStyle = 'rgba(255,228,154,.62)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, dialR, 0, TAU);
      ctx.fill();
      ctx.stroke();
      for (let i = 0; i < 8; i += 1) {
        const angle = (i / 8) * TAU;
        ctx.strokeStyle = 'rgba(255,238,185,.42)';
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * dialR * 0.55, Math.sin(angle) * dialR * 0.55);
        ctx.lineTo(Math.cos(angle) * dialR * 0.82, Math.sin(angle) * dialR * 0.82);
        ctx.stroke();
      }
      ctx.fillStyle = '#4d3217';
      ctx.beginPath();
      ctx.arc(0, 0, dialR * 0.22, 0, TAU);
      ctx.fill();
      ctx.restore();

      if (this.state === 'playing') {
        const pulse = 0.20 + ((Math.sin(now / 110) + 1) * 0.08);
        ctx.strokeStyle = `rgba(247,217,147,${pulse})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(dialX, dialY, dialR * 1.32, 0, TAU);
        ctx.stroke();
      }
    }

    drawTray(ctx, g, w, h) {
      const y = g.trayY;
      const trayW = w * 0.61;
      const trayH = g.ballR * 2.18;
      const x = (w - trayW) / 2;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,.34)';
      ctx.shadowBlur = 18;
      const tray = ctx.createLinearGradient(x, 0, x + trayW, 0);
      tray.addColorStop(0, '#563518');
      tray.addColorStop(0.17, '#b57c34');
      tray.addColorStop(0.5, '#e8c56f');
      tray.addColorStop(0.83, '#9d6428');
      tray.addColorStop(1, '#4d3016');
      ctx.fillStyle = tray;
      roundedRectPath(ctx, x, y - trayH * 0.72, trayW, trayH * 1.05, trayH * 0.22);
      ctx.fill();
      ctx.restore();

      g.slotXs.forEach((slotX) => {
        const well = ctx.createRadialGradient(slotX - 3, y - 5, 2, slotX, y, g.ballR * 1.22);
        well.addColorStop(0, 'rgba(3,28,28,.42)');
        well.addColorStop(1, 'rgba(2,18,18,.9)');
        ctx.fillStyle = well;
        ctx.strokeStyle = 'rgba(255,225,151,.46)';
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(slotX, y, g.ballR * 1.19, 0, TAU);
        ctx.fill();
        ctx.stroke();
      });
    }

    drawOrb(ctx, x, y, radius, number, rotation = 0, alpha = 1) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.shadowColor = 'rgba(0,0,0,.34)';
      ctx.shadowBlur = radius * 0.62;
      ctx.shadowOffsetY = radius * 0.24;
      const sphere = ctx.createRadialGradient(x - radius * 0.34, y - radius * 0.38, radius * 0.08, x, y, radius * 1.06);
      sphere.addColorStop(0, '#fff3c6');
      sphere.addColorStop(0.18, '#f4d587');
      sphere.addColorStop(0.52, '#c38b3d');
      sphere.addColorStop(0.79, '#825222');
      sphere.addColorStop(1, '#3b2917');
      ctx.fillStyle = sphere;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, TAU);
      ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = 'rgba(255,239,190,.72)';
      ctx.lineWidth = Math.max(1, radius * 0.045);
      ctx.stroke();

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation * 0.11);
      ctx.fillStyle = 'rgba(16,46,43,.92)';
      ctx.strokeStyle = 'rgba(255,241,200,.38)';
      ctx.lineWidth = Math.max(1, radius * 0.045);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.49, 0, TAU);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#fff1c4';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const numeralScale = radius < 15 ? 0.88 : 0.76;
      ctx.font = `700 ${radius * numeralScale}px Georgia, "Times New Roman", serif`;
      ctx.fillText(String(number), 0, radius * 0.05);
      ctx.restore();

      const highlight = ctx.createRadialGradient(x - radius * 0.42, y - radius * 0.48, 0, x - radius * 0.36, y - radius * 0.40, radius * 0.46);
      highlight.addColorStop(0, 'rgba(255,255,255,.82)');
      highlight.addColorStop(0.18, 'rgba(255,255,255,.24)');
      highlight.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = highlight;
      ctx.beginPath();
      ctx.arc(x, y, radius * 0.96, 0, TAU);
      ctx.fill();
      ctx.restore();
    }

    drawForeground(ctx, g, w, h) {
      const fade = ctx.createLinearGradient(0, h * 0.72, 0, h);
      fade.addColorStop(0, 'rgba(4,28,28,0)');
      fade.addColorStop(1, 'rgba(4,28,28,.18)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, h * 0.72, w, h * 0.28);

      ctx.strokeStyle = 'rgba(247,217,147,.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w * 0.12, h * 0.965);
      ctx.lineTo(w * 0.88, h * 0.965);
      ctx.stroke();
    }
  }

  window.LGTLuckyMachine = Object.freeze({ version: VERSION, LuckyOracleMachine });
})();
