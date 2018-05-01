import AbstractView from './abstract-view.js';
import HeaderBlock from '../components/header-block.js';

export default class LoaderView extends AbstractView {
  constructor() {
    super();
  }

  /** @return {string} */
  get template() {
    const header = new HeaderBlock();

    return (
      `<section class="main main--loader">
        ${header.template}
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
