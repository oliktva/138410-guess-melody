import {GameLimit} from '../game-data.js';

export default class LevelModel {
  /**
   * @param  {object} data
   */
  constructor(data) {
    this._data = data;
  }

  /**
   * @return  {number}
   */
  get remainingTime() {
    return this._data.remainingTime;
  }

  decreaseRemainingTime() {
    this._data.remainingTime--;
  }

  /**
   * @return  {number}
   */
  get mistakes() {
    return this._data.mistakes;
  }

  /**
   * @return  {object}
   */
  get audio() {
    return this._data.audio;
  }

  addMistake() {
    this._data.mistakes++;
  }

  /**
   * @return  {number}
   */
  get currentLevelValue() {
    return this._data.levels.current;
  }

  /**
   * @return  {object}
   */
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

  /**
   * @return  {boolean}
   */
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
      if (answer.isCorrect) {
        return result && answersIndeces.includes(index);
      } else {
        return result && !answersIndeces.includes(index);
      }
    }, true);
  }
}
