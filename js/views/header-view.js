import AbstractView from './abstract-view.js';

export default class HeaderView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;
  }
}
