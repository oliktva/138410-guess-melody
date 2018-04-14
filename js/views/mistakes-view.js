import AbstractView from './abstract-view.js';

export default class ErrorsView extends AbstractView {
  constructor(mistakes) {
    super();
    this.mistakes = mistakes;
  }

  get template() {
    const mistakeTemplate = `<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`;

    return (
      `<div class="main-mistakes">
        ${this.mistakes.map(() => mistakeTemplate).join(``)}
      </div>`
    );
  }
}
