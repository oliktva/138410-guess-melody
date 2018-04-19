import AbstractView from './abstract-view.js';

export default class LevelView extends AbstractView {
  constructor() {
    super();
  }

  /** @return {string} */
  get template() {
    return `<section class="main main--level"></section>`;
  }
}
