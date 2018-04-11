import {getElementFromTemplate, addClickEvent, getHeaderTemplate} from '../helpers/elements.js';
import {renderScreen} from '../helpers/screens.js';
import welcomeScreenElement from './welcome-screen.js';

/** @enum {string} */
const Data = {
  TITLE: `Какая жалость!`,
  TEXT: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
  ACTION: `Попробовать ещё раз`,
};

/** @return {string} */
const getLevelTemplate = () => {
  return (
    `<section class="main main--result">
      ${getHeaderTemplate()}
      <h2 class="title">${Data.TITLE}</h2>
      <div class="main-stat">${Data.TEXT}</div>
      <span role="button" tabindex="0" class="main-replay">${Data.ACTION}</span>
    </section>`
  );
};

const attemptsEndedResultScreenElement = getElementFromTemplate(getLevelTemplate());

const replayHandler = () => {
  renderScreen(welcomeScreenElement);
};

const replayGame = attemptsEndedResultScreenElement.querySelector(`.main-replay`);
addClickEvent(replayGame, replayHandler);

export default attemptsEndedResultScreenElement;
