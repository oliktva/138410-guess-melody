import AbstractView from '../views/abstract-view.js';

export default class HeaderBlock extends AbstractView {
  constructor() {
    super();
  }

  /** @return {string} */
  get template() {
    return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;
  }
}
