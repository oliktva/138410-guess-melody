export default class Timer {
  constructor(time) {
    if (time) {
      this.remainingTime = time;
      this.timerId = null;
    }
  }

  tick() {
    if (this.remainingTime > 1) {
      this.remainingTime--;
      this.timerId = setTimeout(() => this.tick(), 1000);
    } else if (this.remainingTime) {
      this.remainingTime--;
      this.stop();
    }
  }

  start() {
    this.timerId = setTimeout(() => this.tick(), 1000);
  }

  stop() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }
}
