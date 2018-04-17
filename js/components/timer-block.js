import AbstractView from '../views/abstract-view.js';

import Timer from '../helpers/timer.js';

import {GameLimit} from '../helpers/result.js';

export default class TimerBlock extends AbstractView {
  /** @param {number} remainingTime */
  constructor(remainingTime) {
    super();
    this._remainingTime = remainingTime;
  }

  /**
   * @param  {object} remainingTime
   * @return {object}
   */
  _calculateTimerLine(remainingTime = 0) {
    const dashaaray = 2 * Math.PI * 370;
    const dashoffset = dashaaray - remainingTime * dashaaray / GameLimit.TIME;
    return {dashaaray, dashoffset};
  }

  /** @return {string} */
  get template() {
    const timerVisualEffect = this._calculateTimerLine(this._remainingTime);
    const {minutes, seconds} = Timer.getFormattedTime(this._remainingTime);

    return (
      `<div class="timer-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            style="stroke-dashoffset: ${timerVisualEffect.dashoffset};stroke-dasharray: ${timerVisualEffect.dashaaray};filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;"></circle>

          <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">${minutes}</span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs">${Timer.addZeroIfNeed(seconds)}</span>
          </div>
        </svg>
      </div>`
    );
  }

  get elementSelector() {
    return `.timer-wrapper`;
  }

  timerChangeHandler() {}
}
