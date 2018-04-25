import App from '../app.js';

import ResultView from '../views/result-view.js';
import LoaderView from '../views/loader-view.js';

export default class ResultPresenter {
  /**
   * @param  {object} model
   */
  constructor(model) {
    this._loading = false;
    this.model = model;
    this.view = new ResultView(model.result);
    this.view.replayHandler = () => {
      App.showWelcome();
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
