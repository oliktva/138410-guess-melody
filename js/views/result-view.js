import AbstractView from './abstract-view.js';
import HeaderBlock from '../components/header-block.js';

export default class ResultView extends AbstractView {
  /**
   * @param  {Object} props
   */
  constructor(props) {
    super();
    this._props = props;
  }

  /** @return {string} */
  get template() {
    const {
      title,
      text,
      comparison,
      action
    } = this._props;

    const header = new HeaderBlock();

    return (
      `<section class="main main--result">
        ${header.template}
        <h2 class="title">${title}</h2>
        <div class="main-stat">${text}</div>
        ${comparison ? `<span class="main-comparison">${comparison}</span>` : ``}
        <span role="button" tabindex="0" class="main-replay">${action}</span>
      </section>`
    );
  }

  replayHandler() {}

  /** @param {Element} element */
  bind(element) {
    if (element && typeof this.replayHandler === `function`) {
      const replayGame = element.querySelector(`.main-replay`);
      replayGame.addEventListener(`click`, this.replayHandler);
    }
  }

  clear() {
    if (this._element) {
      this._element.querySelector(`.main-replay`).removeEventListener(`click`, this.replayHandler);
      this._element = null;
    }
  }
}
