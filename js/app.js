import LevelModel from './models/level-model.js';
import ResultModel from './models/result-model.js';

import LoaderView from './views/loader-view.js';

import WelcomePresenter from './presenters/welcome-presenter';
import LevelPresenter from './presenters/level-presenter';
import ResultPresenter from './presenters/result-presenter';

import {getState, clearState} from './game-data.js';

const main = document.querySelector(`.main-container`);

/**
 * @param {Element} element
 */
const changeView = (element) => {
  if (element) {
    main.innerHTML = ``;
    main.appendChild(element);
  }
};

export default class App {
  static showLoader() {
    const loader = new LoaderView();
    changeView(loader.element);
  }

  static showWelcome() {
    clearState();
    const welcome = new WelcomePresenter(getState());
    changeView(welcome.screen);
  }

  static showGame() {
    const level = new LevelPresenter(new LevelModel(getState()));
    changeView(level.screen);
  }

  static showResult() {
    const result = new ResultPresenter(new ResultModel(getState()));
    changeView(result.screen);
  }
}
