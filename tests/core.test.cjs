const test=require('node:test');const assert=require('node:assert/strict');
let Core; try {Core=require('../core.js');} catch {Core={};}
// 捕获：错误推进、重复计分、提示被计为独立、错题未安排复习。
test('wrong answer stays on same question and records review need',()=>{const s=Core.createSession(['日','月']);Core.answer(s,'月');assert.equal(s.index,0);assert.deepEqual(s.review,['日']);assert.equal(s.correct,0);});
test('correct answer resolves once and explicit next advances',()=>{const s=Core.createSession(['日','月']);assert.equal(Core.answer(s,'日').ok,true);Core.answer(s,'日');assert.equal(s.correct,1);assert.equal(s.index,0);Core.next(s);assert.equal(s.index,1);});
test('wrong then correct is assisted and remains in review',()=>{const s=Core.createSession(['日']);Core.answer(s,'月');Core.answer(s,'日');assert.equal(s.independent,0);assert.deepEqual(s.review,['日']);Core.next(s);assert.equal(s.done,true);});
test('hint cannot count as independent recognition',()=>{const s=Core.createSession(['山']);Core.hint(s);Core.answer(s,'山');assert.equal(s.independent,0);});
test('review queue prioritizes missed characters over unseen ones',()=>{assert.deepEqual(Core.reviewQueue({日:{miss:2,seen:1},月:{miss:0,seen:3}},['月','山','日']).slice(0,2),['日','月']);});
test('next cannot skip unanswered question',()=>{const s=Core.createSession(['水']);Core.next(s);assert.equal(s.index,0);assert.equal(s.done,false);});
test('an abandoned wrong attempt still enters the review queue',()=>{assert.deepEqual(Core.reviewQueue({水:{seen:0,miss:1}},['日','水']),['水']);});
