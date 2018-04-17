export default class Timer {
  /**
   * @param {number} time
   * @param {function} cb
   */
  constructor(time, cb = () => {}) {
    if (typeof time !== `number` || time < 0) {
      throw new Error(`Time should be a positive number`);
    }

    this.remainingTime = time;
    this.timerId = null;
    this.cb = cb;
  }

  /**
   * @param  {number} time
   * @return {object}
   */
  static getFormattedTime(time) {
    const minutes = Math.floor(time / 60);

    return {minutes, seconds: time - minutes * 60};
  }

  /**
   * @param {number} time
   * @return {(string|number)}
   */
  static addZeroIfNeed(time) {
    return time < 10 ? `0${time}` : time;
  }

  tick() {
    if (this.remainingTime) {
      this.remainingTime--;
      this.cb();
    }
    if (this.remainingTime < 1) {
      this.stop();
    }
  }

  start() {
    this.timerId = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
