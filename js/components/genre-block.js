import AbstractView from '../views/abstract-view.js';
import PlayerBlock from '../components/player-block.js';

/** @constant {string} */
const ACTION = `Ответить`;

/**
 * @param {object} answer
 * @param {number} index
 * @return {string}
 */
const getAnswerTemplate = (answer, index) => {
  return (
    `<div class="genre-answer">
      <div class="player-container-${index}"></div>
      <input type="checkbox" name="answer" value="answer-${index}" id="a-${index}">
      <label class="genre-answer-check" for="a-${index}"></label>
    </div>`
  );
};

export default class GenreLevelView extends AbstractView {
  /** @param {object} props */
  constructor(props) {
    super();
    this._props = props;
  }

  /** @return {string} */
  get template() {
    const {question: {title}, answers} = this._props.level;

    return (
      `<div class="main-wrap">
          <h2 class="title main-title">${title}</h2>
          <form class="genre">
            ${answers.map((answer, index) => getAnswerTemplate(answer, index + 1)).join(``)}
            <button class="genre-answer-send" type="submit" disabled>${ACTION}</button>
          </form>
        </div>`
    );
  }

  /** @return {string} */
  get gamerAnswers() {
    const answers = Array.from(document.querySelectorAll(`.genre-answer input:checked`));
    return answers.map((answer) => answer.value.substr(-1) - 1);
  }

  /** @return {Element} */
  get element() {
    if (!this._element) {
      const {
        level: {answers},
        audio
      } = this._props;

      this._element = super.element;
      answers.forEach(({audio: audioUrl}, i) => {
        const player = new PlayerBlock(audio[audioUrl]);
        this._element.querySelector(`.player-container-${i + 1}`).appendChild(player.element);
      });
    }
    return this._element;
  }

  /**
   * @param  {Event} evt
   */
  _activateSubmitHandler(evt) {
    const element = evt.target;

    if (element.tagName.toLowerCase() === `input`) {
      if (element.checked || this.element.querySelectorAll(`.genre-answer input:checked`).length) {
        this.element.querySelector(`.genre-answer-send`).disabled = false;
      } else {
        this.element.querySelector(`.genre-answer-send`).disabled = true;
      }
    }
  }

  nextViewHandler() {}

  /**
   * @param  {Element} element
   */
  bind(element) {
    if (element && typeof this.nextViewHandler === `function`) {

      element.querySelector(`form.genre`).addEventListener(`change`, (evt) => this._activateSubmitHandler(evt));
      element.querySelector(`.genre-answer-send`).addEventListener(`click`, this.nextViewHandler);
    }
  }

  clear() {
    if (this._element) {
      const answerForm = this._element.querySelector(`form.genre`);
      const answer = this._element.querySelector(`.genre-answer-send`);

      answerForm.removeEventListener(`change`, (evt) => this._activateSubmitHandler(evt, answerForm, answer));
      answer.removeEventListener(`click`, this.nextViewHandler);
      this._element = null;
    }
  }
}
