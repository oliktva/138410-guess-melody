import LevelModel from './models/level-model.js';
import ResultModel from './models/result-model.js';

import WelcomePresenter from './presenters/welcome-presenter';
import LevelPresenter from './presenters/level-presenter';
import ResultPresenter from './presenters/result-presenter';

import {state, clearState} from './game-data.js';

/**
 * @param {Element} element
 */
const changeView = (element) => {
  if (element) {
    const activeScreen = document.querySelector(`.main`);
    activeScreen.parentElement.replaceChild(element, activeScreen);
  }
};

export default class App {
  static showWelcome() {
    clearState(state);
    const welcome = new WelcomePresenter();
    changeView(welcome.element);
  }

  static showGame() {
    const level = new LevelPresenter(new LevelModel(state));
    changeView(level.element);
  }

  static showResult() {
    const result = new ResultPresenter(new ResultModel(state));
    changeView(result.element);
  }
}
