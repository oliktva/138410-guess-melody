import Result from '../helpers/result.js';

export default class ResultModel {
  /**
   * @param  {object} data
   * @param  {array} results
   */
  constructor(data, results) {
    this._data = data;
    this._results = results;
  }

  /**
   * @return {object}
   */
  get result() {
    const {gamerResults} = this._data;

    const {score, info} = new Result(gamerResults, this._results);
    if (score !== -1) {
      this._results.push(score);
    }

    return info;
  }
}
