import Result from '../helpers/result.js';
import Loader from '../loader.js';

import {GameLimit} from '../game-data.js';

export default class ResultModel {
  /**
   * @param  {object} data
   * @param  {array} results
   */
  constructor(data) {
    this._data = data;
  }

  /**
   * @return {object}
   */
  get result() {
    const {gamerResults} = this._data;

    const {score, info} = new Result(gamerResults, this._data.results);
    if (score !== GameLimit.LOSS_POINTS_VALUE) {
      this._data.results.push(score);
      Loader.postResults({
        answers: gamerResults,
        score
      });
    }

    return info;
  }
}
