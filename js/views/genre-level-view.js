import AbstractView from './abstract-view.js';
import PlayerView from './player-view.js';

export default class GenreLevelView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    const {question: {title}, answers} = this.level;

    return (
      `<div class="main-wrap">
        <h2 class="title main-title">${title}</h2>
        <form class="genre">
          ${answers.map((answer, index) => {
        const playerView = new PlayerView(answer.audio);
        const number = index + 1;

        return (
          `<div class="genre-answer">
            ${playerView.template()}
            <input type="checkbox" name="answer" value="answer-${number}" id="a-${number}">
            <label class="genre-answer-check" for="a-${number}"></label>
          </div>`
        );
      }).join(``)}
        </form>
      </div>`
    );
  }
}
