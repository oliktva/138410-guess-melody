import {getElementFromTemplate, addClickEvent} from '../helpers/elements.js';
import {getHeaderTemplate} from '../helpers/templates.js';
import {renderScreen} from '../helpers/screens.js';
import welcomeScreenElement from './welcome-screen.js';

/** @enum {string} */
const Data = {
  TITLE: `Вы настоящий меломан!`,
  TEXT: `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд<br>вы&nbsp;набрали 12 баллов (8 быстрых)<br>совершив 3 ошибки`,
  RESULT: `Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков`,
  ACTION: `Сыграть ещё раз`,
};

/** @return {string} */
const getLevelTemplate = () => {
  return (
    `<section class="main main--result">
      ${getHeaderTemplate()}
      <h2 class="title">${Data.TITLE}</h2>
      <div class="main-stat">${Data.TEXT}</div>
      <span class="main-comparison">${Data.RESULT}</span>
      <span role="button" tabindex="0" class="main-replay">${Data.ACTION}</span>
    </section>`
  );
};

const replayHandler = () => {
  renderScreen(welcomeScreenElement());
};

/** @return {Element} */
const successResultScreenElement = () => {
  let element = getElementFromTemplate(getLevelTemplate());
  const replayGame = element.querySelector(`.main-replay`);
  addClickEvent(replayGame, replayHandler);

  return element;
};

export default successResultScreenElement;
