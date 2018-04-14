import AbstractView from './abstract-view.js';
import PlayerView from './player-view.js';

export default class ArtistLevelView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    const {question: {title, audio}, answers} = this.level;
    const playerView = new PlayerView(audio);

    return (
      `<div class="main-wrap">
        <h2 class="title main-title">${title}</h2>
        ${playerView.template}
        <form class="main-list">
          ${answers.map((answer, index) => {
        const number = index + 1;
        return (
          `<div class="main-answer-wrapper">
              <input class="main-answer-r" type="radio" id="answer-${number}" name="answer" value="val-${number}"/>
              <label class="main-answer" for="answer-${number}">
                <img class="main-answer-preview" src="${answer.avatar}"
                     alt="${answer.artist}" width="134" height="134">
                ${answer.artist}
              </label>
            </div>`
        );
      }).join(``)}
        </form>
      </div>`
    );
  }
}
