import {adaptData} from './game-data';

const URL = `https://es.dump.academy/guess-melody`;

const NAME = `cat`;
const APP_ID = 138410;

const checkStatus = (response, permittedErrors = [], value) => {
  if (response.ok) {
    return response;
  } else if (permittedErrors.includes(response.status)) {
    return value;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (res) => {
  if (typeof res.json === `function`) {
    return res.json();
  } else {
    return res;
  }
};

export default class Loader {
  static loadData() {
    return fetch(`${URL}/questions`)
        .then(checkStatus)
        .then(toJSON)
        .then(adaptData);
  }

  static loadResults() {
    return fetch(`${URL}/stats/${APP_ID}-${NAME}`)
        .then((response) => checkStatus(response, [404], []))
        .then(toJSON);
  }
}
