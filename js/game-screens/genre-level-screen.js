import {getElementFromTemplate, addClickEvent} from '../helpers/elements.js';
import {getRandom} from '../helpers/utils.js';
import {renderScreen} from '../helpers/screens.js';
import {
  getErrorsTemplate,
  getTimerTemplate,
  getPlayerTemplate
} from '../helpers/templates.js';

import successResultELement from './success-result-screen.js';
import timeOverResultELement from './time-over-result-screen.js';
import attemptsEndeedResultELement from './attempts-ended-result-screen.js';

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

/**
 * @return {Element}
 */
const getResultScreen = () => {
  switch (getRandom(0, 3)) {
    case 0:
      return successResultELement();
    case 1:
      return timeOverResultELement();
    default:
      return attemptsEndeedResultELement();
  }
};

/**
 * @param {Event} evt
 * @param {Element} form
 */
const answerHandler = (evt, form) => {
  evt.preventDefault();
  renderScreen(getResultScreen());
  form.reset();
};

/**
 * @param {Event} evt
 * @param {Element} answer
 * @param {Element} form
 */
const checkAnswersHandler = (evt, answer, form) => {
  const element = evt.target;

  if (element.tagName.toLowerCase() === `input`) {
    if (element.checked || form.querySelectorAll(`.genre-answer input:checked`).length) {
      answer.disabled = false;
    } else {
      answer.disabled = true;
    }
  }
};

/** @return {Element} */
const genreLevelScreenElement = () => {
  let element = getElementFromTemplate(getLevelTemplate(initialState));
  const answer = element.querySelector(`.genre-answer-send`);
  const form = element.querySelector(`form.genre`);

  form.addEventListener(`change`, (evt) => checkAnswersHandler(evt, answer, form));
  addClickEvent(answer, (evt) => answerHandler(evt, form));
  return element;
};

export default genreLevelScreenElement;
