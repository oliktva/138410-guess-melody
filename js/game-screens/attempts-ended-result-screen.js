import {getElementFromTemplate, addClickEvent} from '../helpers/elements.js';
import {renderScreen} from '../helpers/screens.js';
import welcomeScreenElement from './welcome-screen.js';

const attemptsEndedResultScreenElement = getElementFromTemplate(
    `<section class="main main--result">
      <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

      <h2 class="title">Какая жалость!</h2>
      <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
      <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
    </section>`
);

const replayHandler = function () {
  renderScreen(welcomeScreenElement);
};

const replayGame = attemptsEndedResultScreenElement.querySelector(`.main-replay`);
addClickEvent(replayGame, replayHandler);

export default attemptsEndedResultScreenElement;
