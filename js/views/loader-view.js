import AbstractView from './abstract-view.js';

export default class LoaderView extends AbstractView {
  constructor() {
    super();
  }

  /** @return {string} */
  get template() {

    return (
      `<section class="main main--loader">
        <div class="loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>`
    );
  }
}
