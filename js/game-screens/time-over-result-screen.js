import {getElementFromTemplate, addClickEvent, getHeaderTemplate} from '../helpers/elements.js';
import {renderScreen} from '../helpers/screens.js';
import welcomeScreenElement from './welcome-screen.js';

/** @enum {string} */
const Data = {
  TITLE: `Увы и ах!`,
  TEXT: `Время вышло!<br>Вы не успели отгадать все мелодии`,
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

const timeOutResultScreenElement = getElementFromTemplate(getLevelTemplate());

const replayHandler = () => {
  renderScreen(welcomeScreenElement);
};

const replayGame = timeOutResultScreenElement.querySelector(`.main-replay`);
addClickEvent(replayGame, replayHandler);

export default timeOutResultScreenElement;
