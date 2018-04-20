import {copyObject} from './helpers/utils.js';

import LevelModel from './models/level-model.js';
import ResultModel from './models/result-model.js';

import WelcomePresenter from './presenters/welcome-presenter';
import LevelPresenter from './presenters/level-presenter';
import ResultPresenter from './presenters/result-presenter';

import {initialState} from './game-data.js';

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
    state = copyObject(initialState);
    const welcome = new WelcomePresenter();
    changeView(welcome.screen);
  }

  static showGame() {
    if (!state) {
      state = copyObject(initialState);
    }

    const level = new LevelPresenter(new LevelModel(state));
    changeView(level.screen);
  }

  static showResult() {
    if (!state) {
      state = copyObject(initialState);
    }

    const result = new ResultPresenter(new ResultModel(state, results));
    changeView(result.screen);
  }
}
