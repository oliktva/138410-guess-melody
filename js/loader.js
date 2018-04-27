import {adaptData, adaptResults} from './game-data';

const URL = `https://es.dump.academy/guess-melody`;

const NAME = `meow`;
const APP_ID = 138410;

/**
 * @param {object} response
 * @param {Array} permittedErrors
 * @param {any} value
 * @return {any}
 */
const checkStatus = (response, permittedErrors = [], value) => {
  if (response.ok) {
    return response;
  } else if (permittedErrors.includes(response.status)) {
    return value;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

/**
 * @param {object} res
 * @return {object}
 */
const toJSON = (res) => {
  if (typeof res.json === `function`) {
    return res.json();
  } else {
    return res;
  }
};

export default class Loader {
  /** @return {Promise} */
  static loadData() {
    return fetch(`${URL}/questions`)
        .then(checkStatus)
        .then(toJSON)
        .then(adaptData);
  }

  /** @return {Promise} */
  static loadResults() {
    return fetch(`${URL}/stats/${APP_ID}-${NAME}`)
        .then((response) => checkStatus(response, [404], []))
        .then(toJSON)
        .then(adaptResults);
  }

  /**
   * @param {object} data
   * @return {Promise}
   * */
  static postResults(data) {
    return fetch(`${URL}/stats/${APP_ID}-${NAME}`, {
      method: `post`,
      body: JSON.stringify(data),
      headers: {'Content-Type': `application/json`},
    }).then(checkStatus);
  }
}
