import AbstractView from './abstract-view.js';

export default class ResultView extends AbstractView {
  constructor(result) {
    super();
    this.result = result;
  }

  get template() {
    const {
      title,
      text,
      comparison,
      action
    } = this.result;

    return (
      `<div>
        <h2 class="title">${title}</h2>
        <div class="main-stat">${text}</div>
        ${comparison ? `<span class="main-comparison">${comparison}</span>` : ``}
        <span role="button" tabindex="0" class="main-replay">${action}</span>
      </div>`
    );
  }

  startGameHandler() {}

  bind() {
    if (this.element && typeof this.startGameHandler === `function`) {
      const startGame = this.element.querySelector(`.main-replay`);
      startGame.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.startGameHandler();
      });
    }
  }
}
