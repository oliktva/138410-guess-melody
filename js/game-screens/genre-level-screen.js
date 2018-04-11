import {
  getElementFromTemplate,
  addClickEvent,
  getErrorsTemplate,
  getTimerTemplate,
  getPlayerTemplate
} from '../helpers/elements.js';
import {getRandom} from '../helpers/utils.js';
import {renderScreen} from '../helpers/screens.js';

import SuccessResultELement from './success-result-screen.js';
import TimeOverResultELement from './time-over-result-screen.js';
import AttemptsEndeedResultELement from './attempts-ended-result-screen.js';

import {initialState} from '../game-data.js';

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
      ${getPlayerTemplate(answer.audio.src)}
      <input type="checkbox" name="answer" value="answer-${index}" id="a-${index}">
      <label class="genre-answer-check" for="a-${index}"></label>
    </div>`
  );
};

/**
 * @param {Array} answers
 * @return {string}
 */
const getAnswersTemplate = (answers) => {
  return (
    `<form class="genre">
      ${answers.map((answer, index) => getAnswerTemplate(answer, index + 1)).join(``)}
      <button class="genre-answer-send" type="submit" disabled>${ACTION}</button>
    </form>`
  );
};

/**
 * @param {object} state
 * @return {string}
 */
const getLevelTemplate = (state) => {
  let {question, answers} = state.level2;
  return (
    `<section class="main main--level main--level-genre">
      ${getTimerTemplate(state)}
      ${getErrorsTemplate(state)}
      <div class="main-wrap">
        <h2 class="title">${question.title}</h2>
        ${getAnswersTemplate(answers)}
      </div>
    </section>`
  );
};

const genreLevelScreenElement = getElementFromTemplate(getLevelTemplate(initialState));

/**
 * @return {Element}
 */
const getResultScreen = () => {
  switch (getRandom(0, 3)) {
    case 0:
      return SuccessResultELement;
    case 1:
      return TimeOverResultELement;
    default:
      return AttemptsEndeedResultELement;
  }
};

const answersCheckboxes = Array.from(
    genreLevelScreenElement.querySelectorAll(`.genre-answer input[type="checkbox"]`)
);
const answer = genreLevelScreenElement.querySelector(`.genre-answer-send`);

const answerHandler = () => {
  renderScreen(getResultScreen());
  answersCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
    answer.disabled = true;
  });
};

/**
 * @param {Event} evt
 */
const checkAnswersHandler = (evt) => {
  if (evt.target.checked || document.querySelectorAll(`.genre-answer input:checked`).length) {
    answer.disabled = false;
  } else {
    answer.disabled = true;
  }
};

addClickEvent(answer, answerHandler);
answersCheckboxes.forEach(
    (checkbox) => {
      checkbox.addEventListener(`change`, checkAnswersHandler);
    }
);

export default genreLevelScreenElement;
