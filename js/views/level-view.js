import AbstractView from './abstract-view.js';

export default class LevelView extends AbstractView {
  /** @param {object} props */
  constructor(props) {
    super();
    this._props = props;
  }

  /** @return {string} */
  get template() {
    const {type} = this._props;
    return `<section class="main main--level main--level-${type}"></section>`;
  }
}
