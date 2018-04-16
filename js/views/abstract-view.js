import {getElementFromTemplate} from '../helpers/utils.js';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  /** @return {string} */
  get template() {
    return ``;
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  bind() {}

  /** @return {Element} */
  render() {
    return getElementFromTemplate(this.template);
  }
}
