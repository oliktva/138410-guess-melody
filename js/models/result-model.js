import Result from '../helpers/result.js';

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
    if (score !== -1) {
      this._data.results.push(score);
    }

    return info;
  }
}
