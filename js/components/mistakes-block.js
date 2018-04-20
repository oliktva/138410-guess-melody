import AbstractView from '../views/abstract-view.js';

const MISTAKE_TEMPLATE = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

const getMistakesTemplate = (mistakes) => {
  const mistakesTemplate = [];
  for (let i = 0; i < mistakes; i++) {
    mistakesTemplate.push(MISTAKE_TEMPLATE);
  }
  return mistakesTemplate;
};

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
        ${getMistakesTemplate(this._mistakes).join(``)}
      </div>`
    );
  }

  get elementSelector() {
    return `.main-mistakes`;
  }

  update(mistakes) {
    this._mistakes = mistakes;
    this._element.innerHTML = getMistakesTemplate(mistakes).join(``);
  }

  clear() {
    this._element = null;
  }
}
