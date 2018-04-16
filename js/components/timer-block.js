import AbstractView from '../views/abstract-view.js';

export default class TimerBlock extends AbstractView {
  /** @param {object} remainingTime */
  constructor(remainingTime) {
    super();
    this.remainingTime = remainingTime;
  }

  /** @return {string} */
  get template() {
    return (
      `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${this.remainingTime.minutes}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${this.remainingTime.seconds}</span>
        </div>
      </svg>`
    );
  }
}
