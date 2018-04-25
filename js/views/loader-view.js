import AbstractView from './abstract-view.js';

export default class LoaderView extends AbstractView {
  constructor() {
    super();
  }

  /** @return {string} */
  get template() {

    return (
      `<section class="main main--loader">
        <div>LOADING</div>
      </section>`
    );
  }
}
