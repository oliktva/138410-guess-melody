import App from '../app.js';

import ResultView from '../views/result-view.js';

export default class ResultPresenter {
  constructor(model) {
    this.model = model;
    this.view = new ResultView(model.result);
    this.view.replayHandler = () => {
      App.showWelcome();
    };
  }

  get element() {
    return this.view.element;
  }
}