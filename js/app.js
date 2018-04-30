import LevelModel from './models/level-model.js';
import ResultModel from './models/result-model.js';

import LoaderView from './views/loader-view.js';
import ErrorView from './views/error-view.js';

import WelcomePresenter from './presenters/welcome-presenter';
import LevelPresenter from './presenters/level-presenter';
import ResultPresenter from './presenters/result-presenter';

import Loader from './loader.js';
import {getState, clearState, updateState} from './game-data.js';

export default class App {
  static showLoader() {
    const loaderView = new LoaderView();
    loaderView.show();
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    errorView.show();
  }

  static showWelcome() {
    const state = getState();
    const loader = new Loader();
    Promise.resolve(loader.loadAudio(state.levels.resources))
        .then(() => {
          updateState(`audio`, loader.getAudio());
          const welcomeView = new WelcomePresenter(state);
          welcomeView.show();
        }).catch((error) => {
          this.showError(error);
        });
  }

  static showGame() {
    clearState();
    const levelView = new LevelPresenter(new LevelModel(getState()));
    levelView.show();
  }

  static showResult() {
    const resultView = new ResultPresenter(new ResultModel(getState()));
    resultView.show();
  }
}
