import Loader from './loader.js';

import App from './app.js';

import {updateState} from './game-data.js';

App.showLoader();

Promise.all([
  Loader.loadData(),
  Loader.loadResults()
]).then((response) => {
  updateState(`resources`, response[0]);
  updateState(`results`, response[1]);
  App.showWelcome();
});
