import AbstractView from './abstract-view.js';
import TimerBlock from '../components/timer-block.js';
import MistakesBlock from '../components/mistakes-block.js';
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
  /** @param {object} state */
  constructor(state) {
    super();
    this.state = state;
  }

  /** @return {string} */
  get template() {
    const {remainingTime, mistakes, levels} = this.state;
    const {question: {title, audio}, answers} = levels.resources[levels.current];

    const timerView = new TimerBlock(remainingTime);
    const mistakesView = new MistakesBlock(mistakes);
    const playerView = new PlayerBlock(audio);

    return (
      `<section class="main main--level main--level-artist">
        ${timerView.template}
        ${mistakesView.template}
        <div class="main-wrap">
          <h2 class="title main-title">${title}</h2>
          ${playerView.template}
          <form class="main-list">
            ${answers.map((answer, index) => getAnswerTemplate(answer, index + 1)).join(``)}
          </form>
        </div>
      </section>`
    );
  }

  nextViewHandler() {}

  bind(element) {
    if (element && typeof this.nextViewHandler === `function`) {
      const answerForm = element.querySelector(`form.main-list`);
      answerForm.addEventListener(`change`, this.nextViewHandler);
    }
  }
}
