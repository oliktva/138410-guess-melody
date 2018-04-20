import AbstractView from '../views/abstract-view.js';

import Timer from '../helpers/timer.js';
import {GameLimit} from '../game-data.js';

const dashaaray = 2 * Math.PI * 370;

const getDashOffset = (minutes, seconds) => {
  return dashaaray - (minutes * 60 + seconds) * dashaaray / GameLimit.TIME;
};

export default class TimerBlock extends AbstractView {
  /** @param {number} remainingTime */
  constructor(remainingTime) {
    super();
    this._remainingTime = remainingTime;
  }

  /** @return {string} */
  get template() {
    const {minutes, seconds} = Timer.getFormattedTime(this._remainingTime);

    return (
      `<div class="timer-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            style="stroke-dashoffset: ${getDashOffset(minutes, seconds)};stroke-dasharray: ${dashaaray};filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;transition: stroke-dashoffset 1s linear;"></circle>
        </svg>
        <div class="timer-value">
          <span class="timer-value-mins">${minutes}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${Timer.addZeroIfNeed(seconds)}</span>
        </div>
      </div>`
    );
  }

  update(time) {
    const {minutes, seconds} = Timer.getFormattedTime(this._remainingTime);
    const {minutes: newMinutes, seconds: newSeconds} = Timer.getFormattedTime(time);
    const mins = this.element.querySelector(`.timer-value-mins`);
    const secs = this.element.querySelector(`.timer-value-secs`);
    const line = this.element.querySelector(`.timer circle`);

    if (minutes !== newMinutes) {
      mins.innerText = newMinutes;
    }

    if (seconds !== newSeconds) {
      secs.innerText = Timer.addZeroIfNeed(newSeconds);
    }

    line.style.strokeDashoffset = getDashOffset(newMinutes, newSeconds);

    this._remainingTime = time;
  }

  clear() {
    this._element = null;
  }
}
