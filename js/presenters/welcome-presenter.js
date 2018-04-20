import App from '../app.js';

import WelcomeView from '../views/welcome-view.js';

export default class WelcomePresenter {
  constructor() {
    this.view = new WelcomeView();
    this.view.startGameHandler = (evt) => {
      evt.preventDefault();
      App.showGame();
      this.view.clear();
    };
  }

  get element() {
    return this.view.element;
  }
}
