(() => {
  'use strict';

  const VERSION = 'lucky-machine-v1';
  const TAU = Math.PI * 2;
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const lerp = (a, b, t) => a + ((b - a) * t);
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

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
      const r = Math.min(w * 0.315, h * 0.245);
      return {
        cx: w * 0.5,
        cy: h * 0.36,
        chamberR: r,
        ballR: Math.max(16, Math.min(w, h) * 0.053),
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

    resetBalls() {
      const g = this.geometry();
      const positions = [
        [-0.44, -0.42], [0, -0.50], [0.44, -0.40],
        [-0.52, 0.02], [0, -0.04], [0.50, 0.04],
        [-0.38, 0.43], [0.06, 0.48], [0.43, 0.40]
      ];
      this.balls = positions.map(([px, py], index) => ({
        number: index + 1,
        x: g.cx + (px * g.chamberR * 1.15),
        y: g.cy + (py * g.chamberR * 1.15),
        vx: 0,
        vy: 0,
        rotation: (index * 0.51) % TAU,
        spin: 0,
        ejected: false,
        ejectedAt: 0,
        startX: 0,
        startY: 0,
        slotIndex: -1
      }));
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
            this.reducedVisible = index + 1;
            options.onReveal?.(index, this.selected[index]);
            this.draw(performance.now());
            if (index === 2) {
              const done = setTimeout(() => {
                this.state = 'result';
                options.onComplete?.();
                this.draw(performance.now());
              }, 260);
              this.timers.push(done);
            }
          }, 260 + (index * 360));
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
        ball.spin = (index % 2 ? 1 : -1) * (3.2 + (index * 0.18));
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
        const ball = this.balls.find((candidate) => candidate.number === number);
        if (ball) {
          ball.ejected = true;
          ball.slotIndex = index;
        }
      });
      this.draw(performance.now());
    }

    update(now, dt) {
      if (this.state !== 'playing') return;
      const elapsed = (now - this.startedAt) / 1000;
      const g = this.geometry();
      const spinPower = clamp(1 - Math.max(0, elapsed - 2.1) / 1.4, 0.18, 1);
      this.dialAngle += dt * (8.5 + (spinPower * 13));

      if (elapsed > 1.55 && this.phase !== 'reveal') {
        this.phase = 'reveal';
        this.callbacks.onPhase?.('reveal');
      }
      const revealTimes = [1.72, 2.40, 3.08];
      revealTimes.forEach((time, index) => {
        if (elapsed >= time && !this.revealFlags[index]) {
          this.revealFlags[index] = true;
          const ball = this.balls.find((candidate) => candidate.number === this.selected[index]);
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
      live.forEach((ball) => {
        const dx = ball.x - g.cx;
        const dy = ball.y - g.cy;
        const distance = Math.max(1, Math.hypot(dx, dy));
        const tangentX = -dy / distance;
        const tangentY = dx / distance;
        const swirl = g.chamberR * 3.25 * spinPower;
        ball.vx += tangentX * swirl * dt;
        ball.vy += tangentY * swirl * dt;
        ball.vx *= Math.pow(0.55, dt * (0.9 + (1 - spinPower)));
        ball.vy *= Math.pow(0.55, dt * (0.9 + (1 - spinPower)));
        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;
        ball.rotation += ball.spin * dt;

        const fromCenterX = ball.x - g.cx;
        const fromCenterY = ball.y - g.cy;
        const maxDistance = g.chamberR - (g.ballR * 1.03);
        const currentDistance = Math.hypot(fromCenterX, fromCenterY);
        if (currentDistance > maxDistance) {
          const nx = fromCenterX / currentDistance;
          const ny = fromCenterY / currentDistance;
          ball.x = g.cx + (nx * maxDistance);
          ball.y = g.cy + (ny * maxDistance);
          const dot = (ball.vx * nx) + (ball.vy * ny);
          ball.vx -= 1.84 * dot * nx;
          ball.vy -= 1.84 * dot * ny;
        }
      });

      // Lightweight equal-mass collisions keep the nine crystal orbs tactile without a heavy physics dependency.
      for (let i = 0; i < live.length; i += 1) {
        for (let j = i + 1; j < live.length; j += 1) {
          const a = live[i];
          const b = live[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const distance = Math.max(0.001, Math.hypot(dx, dy));
          const minimum = g.ballR * 2.03;
          if (distance >= minimum) continue;
          const nx = dx / distance;
          const ny = dy / distance;
          const overlap = (minimum - distance) * 0.5;
          a.x -= nx * overlap;
          a.y -= ny * overlap;
          b.x += nx * overlap;
          b.y += ny * overlap;
          const relative = ((b.vx - a.vx) * nx) + ((b.vy - a.vy) * ny);
          if (relative < 0) {
            const impulse = -relative * 0.88;
            a.vx -= impulse * nx;
            a.vy -= impulse * ny;
            b.vx += impulse * nx;
            b.vy += impulse * ny;
          }
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

      if (elapsed >= 4.03) {
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

      const idleT = now / 1000;
      this.balls.forEach((ball, index) => {
        if (ball.ejected) return;
        let x = ball.x;
        let y = ball.y;
        if (this.state === 'idle') {
          x += Math.sin(idleT * 0.65 + index) * 1.15;
          y += Math.cos(idleT * 0.52 + index * 0.8) * 0.85;
        }
        this.drawOrb(ctx, x, y, g.ballR, ball.number, ball.rotation, 0.93);
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
          this.drawOrb(ctx, ball.x, ball.y + bounce, g.ballR * 1.08, ball.number, ball.rotation, 1);
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
      ctx.font = `600 ${radius * 0.78}px "Cormorant Garamond", Georgia, serif`;
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
