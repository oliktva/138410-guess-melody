import AbstractView from './abstract-view.js';

import HeaderBlock from '../components/header-block.js';

export default class LoaderView extends AbstractView {
  constructor(error) {
    super();
    this._error = error;
  }

  /** @return {string} */
  get template() {
    const header = new HeaderBlock();

    return (
      `<section class="main main--error">
        <div class="error">
          ${header.template}
          <h2 class="title">Что-то пошло не так…</h2>
          <p class="text main-text">${this._error.message}</p>
        </div>
      </section>`
    );
  }
}
