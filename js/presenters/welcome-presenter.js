import App from '../app.js';

import WelcomeView from '../views/welcome-view.js';
import LoaderView from '../views/loader-view.js';

export default class WelcomePresenter {
  constructor() {
    this._loading = false;
    this.view = new WelcomeView();
    this.view.startGameHandler = (evt) => {
      evt.preventDefault();
      App.showGame();
      this.view.clear();
    };
  }

  /**
   * @return {Element}
   */
  get screen() {
    if (this._loading) {
      return (new LoaderView()).element;
    }

    return this.view.element;
  }

  /**
   * @param {boolean} loading
   */
  set loading(loading) {
    this._loading = loading;
  }
}
