import Result from '../helpers/result.js';
import {initialState} from '../game-data.js'

export default class ResultModel {
  constructor(data) {
    this._data = data;
  }

  get result() {
    const {gamerResults, results} = this._data;

    const {score, info} = new Result(gamerResults, results);
    if (score !== -1) {
      this._data.results.push(score);
      console.log(`result`, initialState)
    }

    return info;
  }
}
