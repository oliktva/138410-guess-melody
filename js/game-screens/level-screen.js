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

import resultScreenElement from './result-screen.js';

import {GameLimit} from '../helpers/result.js';
import {state, ARTIST, GENRE} from '../game-data.js';

/** @constant {string} */
const ACTION = `Ответить`;

/**
 * @param  {Array} answersIndeces
 */
const checkAnswer = (answersIndeces) => {
  const {levels: {current, resources}} = state;
  const currentAnswers = resources[current].answers;
  let isCorrect = false;

  isCorrect = currentAnswers.reduce((result, answer, index) => {
    if (answer.correct) {
      return result && answersIndeces.includes(index);
    } else {
      return result && !answersIndeces.includes(index);
    }
  }, true);

  if (isCorrect) {
    state.results.push({result: isCorrect, time: getRandom(0, 30)});
  } else {
    state.errors++;
  }
};

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
        ${type === ARTIST ? getPlayerTemplate(audio.src, true) : ``}
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
 * @param  {Boolean} isLastLevel
 * @return {Element}
 */
const getNextScreenElement = (isLastLevel) => {
  if (state.errors === GameLimit.MAX_FALSE_ANSWERS_VALUE || isLastLevel) {
    return resultScreenElement();
  } else {
    state.levels.current++;
    return levelScreenElement();
  }
};

/**
 * @param {Event} evt
 * @param {Element} form
 * @param {Boolean} isLastLevel
 * @param {function} cb
 */
const genreAnswerHandler = (evt, form, isLastLevel, cb = () => {}) => {
  evt.preventDefault();
  const answers = Array.from(document.querySelectorAll(`.genre-answer input:checked`));
  cb(answers.map((answer) => answer.value.substr(-1) - 1));
  renderScreen(getNextScreenElement(isLastLevel));
  form.reset();
};

/**
 * @param  {Event}  evt
 * @param  {Boolean} isLastLevel
 * @param {function} cb
 */
const artistAnswerHandler = (evt, isLastLevel, cb = () => {}) => {
  const answer = evt.target;
  if (answer.tagName.toLowerCase() === `input`) {
    cb([answer.value.substr(-1) - 1]);
    evt.preventDefault();
    renderScreen(getNextScreenElement(isLastLevel));
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
    answerForm.addEventListener(`change`, (evt) => artistAnswerHandler(evt, isLastLevel, checkAnswer));
  }

  if (level.type === GENRE) {
    const answerForm = element.querySelector(`form.genre`);
    const answer = element.querySelector(`.genre-answer-send`);

    answerForm.addEventListener(`change`, (evt) => checkAnswersHandler(evt, answer, answerForm));
    answer.addEventListener(`click`, (answer, (evt) => genreAnswerHandler(evt, answerForm, isLastLevel, checkAnswer)));
  }

  return element;
};

export default levelScreenElement;
