/**
 * @param {Element} element
 */
export const changeView = (element) => {
  if (element) {
    const main = document.querySelector(`.main-container`);
    main.innerHTML = ``;
    main.appendChild(element);
  }
};

/**
 * @param {string} markup
 * @return {Element}
 */
const getElementFromTemplate = function (markup) {
  let wrapper = document.createElement(`div`);
  wrapper.innerHTML = markup.trim();
  return wrapper.firstChild;
};

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

  /**
   * @return {Element}
   */
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

  show() {
    changeView(this.element);
  }

  clear() {}
}
