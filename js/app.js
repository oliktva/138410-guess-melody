import Loader from './loader.js';

import LevelModel from './models/level-model.js';
import ResultModel from './models/result-model.js';

import WelcomePresenter from './presenters/welcome-presenter';
import LevelPresenter from './presenters/level-presenter';
import ResultPresenter from './presenters/result-presenter';

import {getState} from './game-data.js';

const main = document.querySelector(`.main-container`);
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
    welcome.loading = true;
    changeView(welcome.screen);

    Loader.loadData()
        .then((response) => {
          state.levels.resources = response.resources;
        }).
        then(() => {
          welcome.loading = false;
          changeView(welcome.screen);
        });
  }

  static showGame() {
    const level = new LevelPresenter(new LevelModel(state));
    changeView(level.screen);
  }

  static showResult() {
    const result = new ResultPresenter(new ResultModel(state));
    result.loading = true;

    changeView(result.screen);
    Loader.loadResults()
        .then((response) => {
          state.results = response;
        })
        .then(() => {
          result.loading = false;
          changeView(result.screen);
        });
  }
}
