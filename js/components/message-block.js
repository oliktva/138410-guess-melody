import AbstractView from '../views/abstract-view.js';

export default class ArtistLevelView extends AbstractView {
  /** @param {string} message */
  constructor(message) {
    super();
    this._message = message;
  }

  /** @return {string} */
  get template() {
    return (
      `<div class="message">${this._message}</div>`
    );
  }

  show() {
    document.querySelector(`body`).appendChild(this.element);
    setTimeout(() => {
      document.querySelector(`body`).removeChild(this.element);
    }, 3000);
  }
}
