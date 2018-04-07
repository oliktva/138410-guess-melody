export default class Timer {
  constructor(time) {
    if (time) {
      this.remainingTime = time;
      this.timerId = null;
    }
  }

  get formattedRemainingTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.addZeroIfNeed(this.remainingTime - minutes * 60);

    return `${minutes}:${seconds}`;
  }

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
