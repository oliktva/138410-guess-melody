import {GameLimit} from '../helpers/result.js';

export default class LevelModel {
  constructor(data) {
    this._data = data;
  }

  get remainingTime() {
    return this._data.remainingTime;
  }

  decreaseRemainingTime() {
    this._data.remainingTime--;
  }

  get mistakes() {
    return this._data.mistakes;
  }

  addMistake() {
    this._data.mistakes++;
  }

  get currentLevelValue() {
    return this._data.levels.current;
  }

  get currentLevelResource() {
    const {levels: {current, resources}} = this._data;
    return resources[current];
  }

  setLevelUp() {
    this._data.levels.current++;
  }

  addGamerResult(result) {
    this._data.gamerResults.push(result);
  }

  isGameOver() {
    return this._data.mistakes === GameLimit.MAX_FALSE_ANSWERS_VALUE || this._data.levels.current === GameLimit.LEVELS_VALUE - 1;
  }

  /**
   * @param  {Array} answersIndeces
   * @return {boolean}
   */
  checkAnswers(answersIndeces) {
    const {answers} = this.currentLevelResource;

    return answers.reduce((result, answer, index) => {
      if (answer.correct) {
        return result && answersIndeces.includes(index);
      } else {
        return result && !answersIndeces.includes(index);
      }
    }, true);
  }
}
