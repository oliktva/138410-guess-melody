import {getElementFromTemplate, addClickEvent} from '../helpers/elements.js';
import {renderScreen} from '../helpers/screens.js';
import artistLevelScreenElement from './artist-level-screen.js';

const welcomeScreenElement = getElementFromTemplate(
    `<section class="main main--welcome">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
      <button class="main-play">Начать игру</button>
      <h2 class="title main-title">Правила игры</h2>
      <p class="text main-text">
        Правила просты&nbsp;— за&nbsp;5 минут ответить на&nbsp;все вопросы.<br>
        Ошибиться можно 3 раза.<br>
        Удачи!
      </p>
    </section>`
);

const startGameHandler = function () {
  renderScreen(artistLevelScreenElement);
};

const startGame = welcomeScreenElement.querySelector(`.main-play`);
addClickEvent(startGame, startGameHandler);

export default welcomeScreenElement;
