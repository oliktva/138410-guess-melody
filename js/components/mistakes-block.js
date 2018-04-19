import AbstractView from '../views/abstract-view.js';

export default class MistakesBlock extends AbstractView {
  /** @param {number} mistakes */
  constructor(mistakes) {
    super();
    this._mistakes = mistakes;
  }

  /** @return {string} */
  get template() {
    const mistakeTemplate = [];
    for (let i = 0; i < this._mistakes; i++) {
      mistakeTemplate.push(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`);
    }

    return (
      `<div class="main-mistakes">
        ${mistakeTemplate.join(``)}
      </div>`
    );
  }

  get elementSelector() {
    return `.main-mistakes`;
  }
}