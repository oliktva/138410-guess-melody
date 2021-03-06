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
    this._player = null;
  }

  /** @return {string} */
  get template() {
    const {question: {title}, answers} = this._props.level;

    return (
      `<div class="main-wrap">
          <h2 class="title main-title">${title}</h2>
          <div class="player-container"></div>
          <form class="main-list">
            ${answers.map((answer, index) => getAnswerTemplate(answer, index + 1)).join(``)}
          </form>
        </div>`
    );
  }

  /** @return {Element} */
  get element() {
    if (!this._element) {
      this._element = super.element;

      const {
        level: {question: {audio: audioUrl}},
        audio
      } = this._props;
      this._player = new PlayerBlock(audio.get(audioUrl), true);

      this._element.querySelector(`.player-container`).appendChild(this._player.element);
    }
    return this._element;
  }

  /** @return {Array} */
  get gamerAnswers() {
    const answer = document.querySelector(`.main-answer-wrapper input:checked`);
    return [answer.value.substr(-1) - 1];
  }

  nextViewHandler() {}

  /**
   * @param  {Element} element
   */
  bind(element) {
    if (element && typeof this.nextViewHandler === `function`) {
      const answerForm = element.querySelector(`form.main-list`);
      answerForm.addEventListener(`change`, this.nextViewHandler);
    }
  }

  clear() {
    if (this._element) {
      this._element.querySelector(`form.main-list`).removeEventListener(`change`, this.nextViewHandler);
      this._player.clear();
      this._element = null;
    }
  }
}
