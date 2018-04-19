import AbstractView from '../views/abstract-view.js';

const MISTAKE_TEMPLATE = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

export default class MistakesBlock extends AbstractView {
  /** @param {number} mistakes */
  constructor(mistakes) {
    super();
    this._mistakes = mistakes;
  }

  /** @return {string} */
  get template() {

    return (
      `<div class="main-mistakes">
        ${this.mistakesTemplate.join(``)}
      </div>`
    );
  }

  get mistakesTemplate() {
    const mistakesTemplate = [];
    for (let i = 0; i < this._mistakes; i++) {
      mistakesTemplate.push(MISTAKE_TEMPLATE);
    }
    return mistakesTemplate;
  }

  get elementSelector() {
    return `.main-mistakes`;
  }

  update(mistakes) {
    this._mistakes = mistakes;
    document.querySelector(`.main-mistakes`).innerHTML = this.mistakesTemplate.join(``);
  }
}
