import AbstractView from '../views/abstract-view.js';
import PlayerBlock from '../components/player-block.js';

/**
 * @param {object} answer
 * @param {number} index
 * @return {string}
 */
const getAnswerTemplate = (answer, index) => {
  return (
    `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
      <label class="main-answer" for="answer-${index}">
        <img class="main-answer-preview" src="${answer.avatar}" alt="${answer.artist}" width="134" height="134">
        ${answer.artist}
      </label>
    </div>`
  );
};

export default class ArtistLevelView extends AbstractView {
  /** @param {object} props */
  constructor(props) {
    super();
    this._props = props;
  }

  /** @return {string} */
  get template() {
    const {question: {title, audio}, answers} = this._props;

    const player = new PlayerBlock(audio, true);

    return (
      `<div class="main-wrap">
          <h2 class="title main-title">${title}</h2>
          ${player.template}
          <form class="main-list">
            ${answers.map((answer, index) => getAnswerTemplate(answer, index + 1)).join(``)}
          </form>
        </div>`
    );
  }

  get elementSelector() {
    return `.main-wrap`;
  }

  get gamerAnswers() {
    const answer = document.querySelector(`.main-answer-wrapper input:checked`);
    return [answer.value.substr(-1) - 1];
  }

  nextViewHandler() {}

  bind(element) {
    if (element && typeof this.nextViewHandler === `function`) {
      const answerForm = element.querySelector(`form.main-list`);
      answerForm.addEventListener(`change`, this.nextViewHandler);
    }
  }

  clear() {
    this._element.querySelector(`form.main-list`).removeEventListener(`change`, this.nextViewHandler);
    this._element = null;
  }
}
