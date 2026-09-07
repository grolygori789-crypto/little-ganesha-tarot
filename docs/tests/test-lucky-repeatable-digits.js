'use strict';

const fs = require('fs');
const vm = require('vm');
const assert = require('assert');
const path = require('path');

const root = path.resolve(__dirname, '..', '..');
const storageSource = fs.readFileSync(path.join(root, 'js/lucky-storage.js'), 'utf8');
const machineSource = fs.readFileSync(path.join(root, 'js/lucky-machine.js'), 'utf8');
const contentSource = fs.readFileSync(path.join(root, 'js/lucky-content.js'), 'utf8');

function storageWithSequence(sequence) {
  const memory = new Map();
  let cursor = 0;
  const context = {
    window: {},
    Date,
    Uint32Array,
    Math,
    console,
    localStorage: {
      getItem: (key) => memory.has(key) ? memory.get(key) : null,
      setItem: (key, value) => memory.set(key, String(value)),
      removeItem: (key) => memory.delete(key)
    },
    crypto: {
      getRandomValues(box) {
        box[0] = sequence[cursor % sequence.length];
        cursor += 1;
        return box;
      }
    }
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(storageSource, context);
  return { api: context.window.LGTLuckyStorage, memory };
}

{
  const { api } = storageWithSequence([7, 7, 7]);
  assert.deepStrictEqual(Array.from(api.generateNumbers()), [7, 7, 7], '777 must be valid');
}

{
  const { api } = storageWithSequence([0, 0, 0]);
  assert.deepStrictEqual(Array.from(api.generateNumbers()), [0, 0, 0], '000 must be valid');
}

{
  const { api, memory } = storageWithSequence([1, 2, 1]);
  assert.deepStrictEqual(Array.from(api.generateNumbers()), [1, 2, 1], 'non-adjacent repeats must be valid');
  const today = api.localDateISO();
  memory.set(api.key, JSON.stringify({ schema: 1, date: today, numbers: [7, 7, 7], createdAt: 1, completed: true, completedAt: 2 }));
  assert.deepStrictEqual(Array.from(api.getToday().numbers), [7, 7, 7], 'stored repeated digits must remain valid');
  memory.set(api.key, JSON.stringify({ schema: 1, date: today, numbers: [1, 2, 3], createdAt: 1, completed: true, completedAt: 2 }));
  assert.deepStrictEqual(Array.from(api.getToday().numbers), [1, 2, 3], 'legacy same-day unique digits must remain valid');
}


{
  const context = { window: {}, console, Math, Object };
  vm.createContext(context);
  vm.runInContext(contentSource, context);
  const Content = context.window.LGTLuckyContent;

  assert.strictEqual(Content.version, 'lucky-content-v1.2');
  assert.deepStrictEqual(Array.from(Content.numberSet([7, 7, 7])), ['7', '77', '777'], '777 display forms must be deduplicated without changing the result');
  assert.deepStrictEqual(Array.from(Content.numberSet([0, 0, 0])), ['0', '00', '000'], '000 display forms must remain meaningful and deduplicated');
  assert.deepStrictEqual(Array.from(Content.numberSet([1, 2, 1])), ['1', '2', '12', '21', '121'], 'non-adjacent repeat display forms must preserve role order');

  const uniqueExpected = {
    en: 'Let initiative set the direction, attunement become the support, and expression keep the day in balance. These numbers do not decide what will happen; they simply give you three qualities to notice as you choose how to respond.',
    th: 'วันนี้ให้ “การเริ่มต้น” เป็นแกน ใช้ “การรับฟัง” เป็นแรงหนุน และให้ “การแสดงออก” ช่วยคุมจังหวะให้พอดี เลขทั้งสามไม่ได้บอกว่าต้องเกิดอะไรขึ้น แต่ชวนให้สังเกตคุณภาพสามอย่างนี้เมื่อเลือกว่าจะตอบสนองกับเรื่องต่างๆ อย่างไร',
    hi: 'आज “पहल” को दिशा बनने दें, “तालमेल” को सहारा और “अभिव्यक्ति” को संतुलन। ये तीन अंक यह तय नहीं करते कि क्या होगा; वे बस याद दिलाते हैं कि आज फैसलों और प्रतिक्रियाओं में किन तीन गुणों पर ध्यान देना उपयोगी हो सकता है।'
  };
  for (const language of ['en', 'th', 'hi']) {
    assert.strictEqual(Content.pattern([1, 2, 3], language), uniqueExpected[language], `unique-digit ${language} pattern must remain unchanged`);
  }

  const repeatCases = [
    { numbers: [7, 7, 7], kind: 'all-same' },
    { numbers: [7, 7, 2], kind: 'core-support' },
    { numbers: [7, 2, 7], kind: 'core-balance' },
    { numbers: [2, 7, 7], kind: 'support-balance' }
  ];
  const requiredMarkers = {
    en: ['strongly emphasized', 'emphasized twice', 'connects both the direction and the balance', 'emphasized in both support and balance'],
    th: ['เด่นชัดเป็นพิเศษ', 'ถูกเน้นย้ำทั้งในฐานะแกนและแรงหนุน', 'เชื่อมทั้งแกนและสมดุลของวัน', 'ถูกเน้นย้ำทั้งในฐานะแรงหนุนและสิ่งที่ช่วยรักษาสมดุล'],
    hi: ['पर खास जोर है', 'दिशा और सहारे—दोनों में मौजूद है', 'दिशा और संतुलन—दोनों में मौजूद है', 'सहारे और संतुलन—दोनों में मौजूद है']
  };
  for (const language of ['en', 'th', 'hi']) {
    repeatCases.forEach((testCase, index) => {
      const value = Content.pattern(testCase.numbers, language);
      assert(value.includes(requiredMarkers[language][index]), `${testCase.kind} ${language} pattern must be repetition-aware`);
      assert(value.length > 80, `${testCase.kind} ${language} pattern must remain substantive`);
    });
  }
}

class FakeGradient { addColorStop() {} }
class FakeContext {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        if (prop in target) return target[prop];
        if (prop === 'createLinearGradient' || prop === 'createRadialGradient') return () => new FakeGradient();
        return () => {};
      },
      set(target, prop, value) { target[prop] = value; return true; }
    });
  }
}
class FakeCanvas {
  constructor() { this.width = 0; this.height = 0; this.ctx = new FakeContext(); }
  getContext() { return this.ctx; }
  getBoundingClientRect() { return { width: 360, height: 470 }; }
}
class FakeResizeObserver { observe() {} }

{
  const context = {
    window: { addEventListener() {}, devicePixelRatio: 1 },
    HTMLCanvasElement: FakeCanvas,
    ResizeObserver: FakeResizeObserver,
    performance: { now: () => 0 },
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {},
    setTimeout,
    clearTimeout,
    Math,
    Object,
    console
  };
  vm.createContext(context);
  vm.runInContext(machineSource, context);
  const Machine = context.window.LGTLuckyMachine.LuckyOracleMachine;
  const machine = new Machine(new FakeCanvas());
  assert.strictEqual(machine.balls.length, 30, 'machine must contain exactly 30 physical orbs');
  for (let digit = 0; digit <= 9; digit += 1) {
    assert.strictEqual(machine.balls.filter((ball) => ball.number === digit).length, 3, `digit ${digit} must have three physical copies`);
  }
  const g = machine.geometry();
  assert(g.chamberR > 113 && g.chamberR < 121, 'default chamber should grow only slightly');
  assert(g.mixBallR < g.ballR, 'mixing orbs must be smaller than result orbs');

  machine.showResult([7, 7, 7]);
  const restored = machine.balls.filter((ball) => ball.ejected && ball.number === 7);
  assert.strictEqual(restored.length, 3, '777 restore must use three separate physical 7 orbs');
  assert.strictEqual(Array.from(restored, (ball) => ball.slotIndex).sort().join(','), '0,1,2', 'duplicate orbs must occupy three different result wells');

  machine.play([7, 7, 7], {});
  machine.startedAt = 0;
  machine.update(3500, 0.016);
  const revealed = machine.balls.filter((ball) => ball.ejected && ball.number === 7);
  assert.strictEqual(revealed.length, 3, '777 live reveal must eject three separate physical 7 orbs');
  assert.strictEqual(Array.from(revealed, (ball) => ball.slotIndex).sort().join(','), '0,1,2', 'live duplicate reveal must map to all three wells');

  machine.play([0, 0, 0], {});
  machine.startedAt = 0;
  for (let frame = 1; frame <= 240; frame += 1) {
    const now = frame * (1000 / 60);
    machine.update(now, 1 / 60);
    for (const ball of machine.balls) {
      assert(Number.isFinite(ball.x) && Number.isFinite(ball.y), 'ball physics must remain finite');
    }
  }
}

assert(machineSource.includes("const VERSION = 'lucky-machine-v1.2'"));
assert(contentSource.includes("const VERSION = 'lucky-content-v1.2'"));
assert(machineSource.includes('mixBallR'));

console.log('Lucky repeatable digits QA: PASS');
