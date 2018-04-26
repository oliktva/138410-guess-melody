import LevelModel from './models/level-model.js';
import ResultModel from './models/result-model.js';

import LoaderView from './views/loader-view.js';

import WelcomePresenter from './presenters/welcome-presenter';
import LevelPresenter from './presenters/level-presenter';
import ResultPresenter from './presenters/result-presenter';

import {getState, clearState} from './game-data.js';

export default class App {
  static showLoader() {
    const loader = new LoaderView();
    loader.show();
  }

  static showWelcome() {
    clearState();
    const welcome = new WelcomePresenter(getState());
    welcome.show();
  }

  static showGame() {
    const level = new LevelPresenter(new LevelModel(getState()));
    level.show();
  }

  static showResult() {
    const result = new ResultPresenter(new ResultModel(getState()));
    result.show();
  }
}
