import App from '../app.js';

import ResultView from '../views/result-view.js';

export default class ResultPresenter {
  /**
   * @param  {object} model
   */
  constructor(model) {
    this.model = model;
    this.view = new ResultView(model.result);
    this.view.replayHandler = () => {
      App.showGame();
      this.view.clear();
    };
  }

  show() {
    this.view.show();
  }
}
