import LevelModel from './models/level-model.js';
import ResultModel from './models/result-model.js';

import LoaderView from './views/loader-view.js';
import ErrorView from './views/error-view.js';
import MessageBlock from './components/message-block.js';

import WelcomePresenter from './presenters/welcome-presenter';
import LevelPresenter from './presenters/level-presenter';
import ResultPresenter from './presenters/result-presenter';

import Loader from './loader.js';
import {getState, clearState, updateState} from './game-data.js';

/**
 * @param {object} state
 */
const showWelcome = (state) => {
  const welcomeView = new WelcomePresenter(state);
  welcomeView.show();
};

export default class App {
  static showLoader() {
    const loaderView = new LoaderView();
    loaderView.show();
  }

  static showError(error) {
    const errorView = new ErrorView(error);
    errorView.show();
  }

  static showMessage(message) {
    const messageBlock = new MessageBlock(message);
    messageBlock.show();
  }

  static showWelcome() {
    const state = getState();
    const loader = new Loader();

    Promise.resolve(loader.loadAudio(state.levels.resources))
        .then(() => {
          updateState(`audio`, loader.getAudio());
          showWelcome(state);
        }).catch((error) => {
          this.showMessage(error);
          updateState(`audio`, loader.getAudio());
          showWelcome(state);
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
