import {getElementFromTemplate} from '../helpers/utils.js';

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Can't instantiate AbstractView, only concrete one`);
    }
  }

  get template() {
    return ``;
  }

  get element() {
    if (this.element) {
      return this.element;
    }
    this.element = this.render();
    this.bind();
    return this.element;
  }

  bind() {}

  render() {
    return getElementFromTemplate(this.template);
  }
}
