import {
  getElementFromTemplate,
  addClickEvent,
  getErrorsTemplate,
  getTimerTemplate,
  getPlayerTemplate
} from '../helpers/elements.js';
import {renderScreen} from '../helpers/screens.js';

import genreLevelScreenElement from './genre-level-screen.js';

import {initialState} from '../game-data.js';

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
        <img class="main-answer-preview" src="${answer.avatar}"
             alt="${answer.artist}" width="134" height="134">
        ${answer.artist}
      </label>
    </div>`
  );
};

/**
 * @param {Array} answers
 * @return {string}
 */
const getAnswersTemplate = (answers) => {
  return (
    `<form class="main-list">
      ${answers.map((answer, index) => getAnswerTemplate(answer, index + 1)).join(``)}
    </form>`
  );
};

/**
 * @param {object} state
 * @return {string}
 */
const getScreenTemplate = (state) => {
  let {question, answers} = state.level1;
  return (
    `<section class="main main--level main--level-artist">
      ${getTimerTemplate(state)}
      ${getErrorsTemplate(state)}
      <div class="main-wrap">
        <h2 class="title main-title">${question.title}</h2>
        ${getPlayerTemplate(question.audio.src)}
        ${getAnswersTemplate(answers)}
      </div>
    </section>`
  );
};

const artistLevelScreenElement = getElementFromTemplate(getScreenTemplate(initialState));

const answerHandler = () => {
  renderScreen(genreLevelScreenElement);
};

Array.from(artistLevelScreenElement.querySelectorAll(`.main-answer`)).forEach(
    (element) => addClickEvent(element, answerHandler)
);

export default artistLevelScreenElement;
