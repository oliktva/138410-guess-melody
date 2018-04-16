import AbstractView from '../views/abstract-view.js';

export default class TimerBlock extends AbstractView {
  /** @param {object} remainingTime */
  constructor(remainingTime) {
    super();
    this.remainingTime = remainingTime;
  }

  /**
   * @param  {number} minutes
   * @param  {number} seconds
   * @return {object}
   */
  _calculateTimerLine(minutes = 5, seconds = 0) {
    const dashaaray = 2 * Math.PI * 370;
    const dashoffset = dashaaray - (minutes * 60 + seconds) * dashaaray / 300;
    return {dashaaray, dashoffset};
  }

  /** @return {string} */
  get template() {
    const {minutes, seconds} = this.remainingTime;
    const timerVisualEffect = this._calculateTimerLine(minutes, seconds);

    return (
      `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="stroke-dashoffset: ${timerVisualEffect.dashoffset};stroke-dasharray: ${timerVisualEffect.dashaaray};filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center;transition: all 0.3s"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${minutes}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">${seconds}</span>
        </div>
      </svg>`
    );
  }
}
