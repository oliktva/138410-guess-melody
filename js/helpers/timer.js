export default class Timer {
  /**
   * @param {number} time
   */
  constructor(time) {
    if (typeof time !== `number` || time < 0) {
      throw new Error(`Time should be a positive number`);
    }

    this.remainingTime = time;
    this.timerId = null;
  }

  /**
   * @return {string}
   */
  get formattedRemainingTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.addZeroIfNeed(this.remainingTime - minutes * 60);

    return `${minutes}:${seconds}`;
  }

  /**
   * @param {number} time
   * @return {(string|number)}
   */
  addZeroIfNeed(time) {
    return time < 10 ? `0${time}` : time;
  }

  tick() {
    if (this.remainingTime) {
      this.remainingTime--;
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
