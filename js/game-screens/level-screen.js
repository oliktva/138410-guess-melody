import {getElementFromTemplate} from '../helpers/elements.js';
import {renderScreen} from '../helpers/screens.js';
import {getRandom} from '../helpers/utils.js';
import {
  getErrorsTemplate,
  getTimerTemplate,
  getPlayerTemplate,
  getArtistAnswerTemplate,
  getGenreAnswerTemplate
} from '../helpers/templates.js';

import successResultELement from './success-result-screen.js';
import timeOverResultELement from './time-over-result-screen.js';
import attemptsEndeedResultELement from './attempts-ended-result-screen.js';

import {state, ARTIST, GENRE} from '../game-data.js';

/** @constant {string} */
const ACTION = `Ответить`;

/**
 * @param  {object} answer
 * @param  {number} index
 * @param  {string} type
 * @return {string}
 */
const getAnswerTemplate = (answer, index, type) => {
  switch (type) {
    case ARTIST:
      return getArtistAnswerTemplate(answer, index);
    default:
      return getGenreAnswerTemplate(answer, index);
  }
};

/**
 * @param {Array} answers
 * @param {string} type
 * @return {string}
 */
const getAnswersTemplate = (answers, type) => {
  const formClass = type === ARTIST ? `main-list` : `genre`;
  const button = type === GENRE ? `<button class="genre-answer-send" type="submit" disabled>${ACTION}</button>` : ``;

  return (
    `<form class=${formClass}>
      ${answers.map((answer, index) => getAnswerTemplate(answer, index + 1, type)).join(``)}
      ${button}
    </form>`
  );
};

/**
 * @param {object} remainingTime
 * @param {number} errors
 * @param {object} level
 * @return {string}
 */
const getScreenTemplate = (remainingTime, errors, level) => {
  const {
    type,
    question: {title, audio},
    answers
  } = level;

  return (
    `<section class="main main--level main--level-${type}">
      ${getTimerTemplate(remainingTime)}
      ${getErrorsTemplate(errors)}
      <div class="main-wrap">
        <h2 class="title main-title">${title}</h2>
        ${type === ARTIST ? getPlayerTemplate(audio.src) : ``}
        ${getAnswersTemplate(answers, type)}
      </div>
    </section>`
  );
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
 * @param {Boolean} isLastLevel
 */
const genreAnswerHandler = (evt, form, isLastLevel) => {
  evt.preventDefault();
  if (isLastLevel) {
    renderScreen(getResultScreen());
  } else {
    state.levels.current++;
    renderScreen(levelScreenElement());
  }
  form.reset();
};

/**
 * @param  {Event}  evt
 * @param  {Boolean} isLastLevel
 */
const artistAnswerHandler = (evt, isLastLevel) => {
  if (evt.target.tagName.toLowerCase() === `input`) {
    evt.preventDefault();
    if (isLastLevel) {
      renderScreen(getResultScreen());
    } else {
      state.levels.current++;
      renderScreen(levelScreenElement());
    }
  }
};

/** @return {Element} */
const levelScreenElement = () => {
  const {
    remainingTime,
    errors,
    levels: {resources, current}
  } = state;
  const level = resources[current];
  const isLastLevel = current === resources.length - 1;
  let element = getElementFromTemplate(getScreenTemplate(remainingTime, errors, level));

  if (level.type === ARTIST) {
    const answerForm = element.querySelector(`form.main-list`);
    answerForm.addEventListener(`change`, (evt) => artistAnswerHandler(evt, isLastLevel));
  }

  if (level.type === GENRE) {
    const answerForm = element.querySelector(`form.genre`);
    const answer = element.querySelector(`.genre-answer-send`);

    answerForm.addEventListener(`change`, (evt) => checkAnswersHandler(evt, answer, answerForm));
    answer.addEventListener(`click`, (answer, (evt) => genreAnswerHandler(evt, answerForm, isLastLevel)));
  }

  return element;
};

export default levelScreenElement;
