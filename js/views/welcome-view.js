import AbstractView from './abstract-view.js';
import HeaderBlock from '../components/header-block.js';

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

  /** @return {string} */
  get template() {
    const header = new HeaderBlock();

    return (
      `<section class="main main--welcome">
        ${header.template}
        <button class="main-play">${Data.ACTION}</button>
        <h2 class="title main-title">${Data.TITLE}</h2>
        <p class="text main-text">${Data.TEXT}</p>
      </section>`
    );
  }

  startGameHandler() {}

  /** @param {Element} element */
  bind(element) {
    if (element && typeof this.startGameHandler === `function`) {
      const startGame = element.querySelector(`.main-play`);
      startGame.addEventListener(`click`, this.startGameHandler);
    }
  }

  clear() {
    if (this._element) {
      this._element.querySelector(`.main-play`).removeEventListener(`click`, this.startGameHandler);
      this._element = null;
    }
  }
}
