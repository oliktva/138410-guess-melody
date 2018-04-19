import LevelModel from './models/level-model.js';
import ResultModel from './models/result-model.js';

import WelcomePresenter from './presenters/welcome-presenter';
import LevelPresenter from './presenters/level-presenter';
import ResultPresenter from './presenters/result-presenter';

import {getState} from './game-data.js';

const main = document.querySelector(`.main-container`);
const results = [];

let state = null;

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
  static showWelcome() {
    state = getState();
    const welcome = new WelcomePresenter();
    changeView(welcome.element);
  }

  static showGame() {
    if (!state) {
      state = getState();
    }

    const level = new LevelPresenter(new LevelModel(state));
    changeView(level.element);
  }

  static showResult() {
    if (!state) {
      state = getState();
    }

    const result = new ResultPresenter(new ResultModel(state, results));
    changeView(result.element);
  }
}
