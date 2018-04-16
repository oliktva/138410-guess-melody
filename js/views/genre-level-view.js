import AbstractView from './abstract-view.js';
import TimerBlock from '../components/timer-block.js';
import MistakesBlock from '../components/mistakes-block.js';
import PlayerBlock from '../components/player-block.js';

/** @constant {string} */
const ACTION = `Ответить`;

/**
 * @param {object} answer
 * @param {number} index
 * @return {string}
 */
const getAnswerTemplate = (answer, index) => {
  const playerView = new PlayerBlock(answer.audio);

  return (
    `<div class="genre-answer">
      ${playerView.template}
      <input type="checkbox" name="answer" value="answer-${index}" id="a-${index}">
      <label class="genre-answer-check" for="a-${index}"></label>
    </div>`
  );
};

export default class GenreLevelView extends AbstractView {
  /** @param {object} state */
  constructor(state) {
    super();
    this.state = state;
  }

  /** @return {string} */
  get template() {
    const {remainingTime, mistakes, levels} = this.state;
    const {question: {title}, answers} = levels.resources[levels.current];

    const timerView = new TimerBlock(remainingTime);
    const mistakesView = new MistakesBlock(mistakes);

    return (
      `<section class="main main--level main--level-artist">
        ${timerView.template}
        ${mistakesView.template}
        <div class="main-wrap">
          <h2 class="title main-title">${title}</h2>
          <form class="genre">
            ${answers.map((answer, index) => getAnswerTemplate(answer, index + 1)).join(``)}
            <button class="genre-answer-send" type="submit" disabled>${ACTION}</button>
          </form>
        </div>
      <section>`
    );
  }

  _activateSubmitHandler(evt, form, answer) {
    const element = evt.target;

    if (element.tagName.toLowerCase() === `input`) {
      if (element.checked || form.querySelectorAll(`.genre-answer input:checked`).length) {
        answer.disabled = false;
      } else {
        answer.disabled = true;
      }
    }
  }

  nextViewHandler() {}

  bind(element) {
    if (element && typeof this.nextViewHandler === `function`) {
      const answerForm = element.querySelector(`form.genre`);
      const answer = element.querySelector(`.genre-answer-send`);

      answerForm.addEventListener(`change`, (evt) => this._activateSubmitHandler(evt, answerForm, answer));
      answer.addEventListener(`click`, this.nextViewHandler);
    }
  }
}
