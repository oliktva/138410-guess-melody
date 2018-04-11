import {getElementFromTemplate, addClickEvent, getHeaderTemplate} from '../helpers/elements.js';
import {renderScreen} from '../helpers/screens.js';
import artistLevelScreenElement from './artist-level-screen.js';

/** @enum {string} */
const Data = {
  TITLE: `Правила игры`,
  TEXT: `Правила просты&nbsp;— за&nbsp;5 минут ответить на&nbsp;все вопросы.<br>Ошибиться можно 3 раза.<br>Удачи!`,
  ACTION: `Начать игру`
};

/** @return {string} */
const getScreenTemplate = () => {
  return (
    `<section class="main main--welcome">
      ${getHeaderTemplate()}
      <button class="main-play">${Data.ACTION}</button>
      <h2 class="title main-title">${Data.TITLE}</h2>
      <p class="text main-text">${Data.TEXT}</p>
    </section>`
  );
};

const startGameHandler = () => {
  renderScreen(artistLevelScreenElement());
};

/** @return {Element} */
const welcomeScreenElement = () => {
  let element = getElementFromTemplate(getScreenTemplate());
  const startGame = element.querySelector(`.main-play`);
  addClickEvent(startGame, startGameHandler);

  return element;
};

export default welcomeScreenElement;
