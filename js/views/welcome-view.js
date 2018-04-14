import AbstractView from './abstract-view.js';

/** @enum {string} */
const Data = {
  TITLE: `Правила игры`,
  TEXT: `Правила просты&nbsp;— за&nbsp;5 минут ответить на&nbsp;все вопросы.<br>Ошибиться можно 3 раза.<br>Удачи!`,
  ACTION: `Начать игру`
};

export default class WelcomeView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return (
      `<div>
        <button class="main-play">${Data.ACTION}</button>
        <h2 class="title main-title">${Data.TITLE}</h2>
        <p class="text main-text">${Data.TEXT}</p>
      </div>`
    );
  }

  startGameHandler() {}

  bind() {
    if (this.element && typeof this.startGameHandler === `function`) {
      const startGame = this.element.querySelector(`.main-play`);
      startGame.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.startGameHandler();
      });
    }
  }
}
