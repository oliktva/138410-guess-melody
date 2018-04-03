import {expect} from 'chai';

import Timer from './timer.js';

describe(`timer`, () => {
  it(`should return a timer`, () => {
    const timer = new Timer(5);
    expect(timer.remainingTime).to.equal(5);
    expect(timer.timerId).to.equal(null);
  });

  it(`should decrease remainingTime after tick`, () => {
    const timer = new Timer(2);
    timer.tick();
    expect(timer.remainingTime).to.equal(1);
    expect(timer.timerId).to.be.a(`object`);
    timer.stop();
  });
  it(`shouldn't decrease remainingTime to negative after tick`, () => {
    const timer = new Timer(1);
    timer.tick();
    timer.tick();
    expect(timer.remainingTime).to.equal(0);
    expect(timer.timerId).to.equal(null);
    timer.stop();
  });
  it(`should stop timer`, () => {
    const timer = new Timer(10);
    timer.tick();
    timer.stop();
    expect(timer.remainingTime).to.be.a(`number`);
    expect(timer.timerId).to.equal(null);
  });
});
