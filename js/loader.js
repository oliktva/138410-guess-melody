import {adaptData, adaptResults, getAudioUrls} from './game-data';

const URL = `https://es.dump.academy/guess-melody`;

const NAME = `meow`;
const APP_ID = 138410;
const LOAD_SONG_TIMEOUT = 30000;

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

export default class Loader {
  constructor() {
    this._songs = {};
  }

  getAudio() {
    return this._songs;
  }

  /** @return {Promise} */
  static async loadData() {
    const response = await fetch(`${URL}/questions`);
    checkStatus(response);
    const responseData = await response.json();
    return adaptData(responseData);
  }

  /**
   * @param {string} url
   * @return {Promise}
   */
  loadSong(url) {
    return new Promise((resolve, reject) => {
      const song = new Audio();
      this._songs[url] = song;

      const timeout = setTimeout(() => {
        reject(new Error(`Возникла ошибка при загрузке композиции`));
      }, LOAD_SONG_TIMEOUT);

      song.addEventListener(`canplaythrough`, () => {
        clearTimeout(timeout);
        resolve();
      }, false);

      song.src = url;
      song.load();
    });
  }

  /**
   * @param {Array} resources
   * @return {Promise}
   */
  async loadAudio(resources) {
    const audioUrls = getAudioUrls(resources);
    return await Promise.all(audioUrls.map((src) => this.loadSong(src)));
  }

  /** @return {Promise} */
  static async loadResults() {
    const response = await fetch(`${URL}/stats/${APP_ID}-${NAME}`);
    checkStatus(response, [404], []);
    const responseData = await response.json();
    return adaptResults(responseData);
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
