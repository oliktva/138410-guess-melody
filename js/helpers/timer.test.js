import {expect} from 'chai';

import Timer from './timer.js';

describe(`timer`, () => {
  it(`should throw error`, () => {
    const message = `Time should be a positive number`;

    expect(() => new Timer()).to.throw(message);
    expect(() => new Timer(-5)).to.throw(message);
  });

  it(`should return a timer`, () => {
    const timer = new Timer(5);
    expect(timer.remainingTime).to.equal(5);
    expect(timer.timerId).to.equal(null);
  });

  it(`should decrease remainingTime after tick`, () => {
    const timer = new Timer(2);
    timer.tick();
    expect(timer.remainingTime).to.equal(1);
    timer.stop();
  });

  it(`shouldn't decrease remainingTime to negative after tick`, () => {
    const timer = new Timer(1);
    timer.tick();
    timer.tick();
    expect(timer.remainingTime).to.equal(0);
    timer.stop();
  });

  it(`should stop timer`, () => {
    const timer = new Timer(10);
    timer.start();
    expect(timer.timerId).to.be.a(`object`);
    timer.stop();
    expect(timer.remainingTime).to.be.a(`number`);
    expect(timer.timerId).to.equal(null);
  });
});
