import {getDeclensionWord} from './utils.js';
import Timer from './timer.js';

/** @enum {number} */
export const GameLimit = {
  LEVELS_VALUE: 10,
  MAX_FALSE_ANSWERS_VALUE: 3,
  FAST_ANSWER_TIME: 30,
  TIME: 300
};

const successTextTemplate = `Вы&nbsp;заняли {i}-ое место из&nbsp;{n}.<br>Это лучше, чем у&nbsp;{p}% игроков`;
const successComparisonTemplate = `За&nbsp;{m} и {s}<br>вы&nbsp;набрали {p} ({f})<br>совершив {e}`;

/** @enum {object} */
const GameResult = {
  SUCCESS: {
    title: `Вы настоящий меломан!`,
    text: ``,
    comparison: ``,
    action: `Сыграть ещё раз`
  },
  ATTEMPTS_ENDED: {
    title: `Какая жалость!`,
    text: `У&nbsp;вас закончились все попытки.<br>Ничего, повезёт в&nbsp;следующий раз!`,
    action: `Попробовать ещё раз`
  },
  TIME_OVER: {
    title: `Какая жалость!`,
    text: `Время вышло!<br>Вы&nbsp;не&nbsp;успели отгадать все мелодии`,
    action: `Попробовать ещё раз`
  }
};

export default class Result {
  constructor(answers, results) {
    this._answers = answers;
    this._fastAnswers = 0;

    this._score = this._calculateScore();
    this._info = this._getGameResult(results);
  }

  get score() {
    return this._score;
  }

  get info() {
    return this._info;
  }

  _getTime(answer, index) {
    const prev = index ? this._answers[index - 1].time : GameLimit.TIME;
    return prev - answer.time;
  }

  /**
   * @param {Array} answers
   * @return {number}
   */
  _calculateScore() {
    this._mistakes = this._answers.filter((answer) => !answer.result).length;

    if (this._answers.length < GameLimit.LEVELS_VALUE || this._mistakes === GameLimit.MAX_FALSE_ANSWERS_VALUE) {
      return -1;
    }

    return this._answers.reduce((score, answer, index) => {
      if (answer.result) {
        const time = this._getTime(answer, index);
        if (time <= GameLimit.FAST_ANSWER_TIME) {
          this._fastAnswers++;
          return score + 2;
        }

        return score + 1;
      }

      return score - 2;
    }, 0);
  }

  _getGameTime() {
    return GameLimit.TIME - this._answers[this._answers.length - 1].time;
  }

  /**
   * @param {Array} otherScores
   * @return {object}
   */
  _getGameResult(otherScores = []) {
    if (typeof this._score !== `number`) {
      return null;
    }

    if (this._score === -1) {
      if (this._mistakes === GameLimit.MAX_FALSE_ANSWERS_VALUE) {
        return GameResult.ATTEMPTS_ENDED;
      }
      return GameResult.TIME_OVER;
    }

    let scores = otherScores.slice();
    scores.push(this._score);
    scores = scores.sort((a, b) => a - b);

    const position = scores.indexOf(this._score);
    const place = scores.length - position;
    const percent = otherScores.length ? Math.floor((position / scores.length) * 100) : 100;
    const {minutes, seconds} = Timer.getFormattedTime(this._getGameTime());

    const gamersWord = getDeclensionWord(
        scores.length, {one: `игрока`, other: `игроков`}
    );
    const minutesWord = getDeclensionWord(
        minutes, {one: `минуту`, few: `минуты`, many: `минут`, other: `минуты`}
    );
    const secondsWord = getDeclensionWord(
        seconds, {one: `секунду`, few: `секунды`, many: `секунд`, other: `секунды`}
    );
    const pointsWord = getDeclensionWord(
        this._score, {one: `балл`, few: `балла`, many: `баллов`, other: `балла`}
    );
    const mistakesWord = getDeclensionWord(
        this._mistakes, {one: `ошибку`, few: `ошибки`, many: `ошибок`, other: `ошибки`}
    );
    const fastWord = getDeclensionWord(
        this._fastAnswers, {one: `быстрый`, other: `быстрых`}
    );

    GameResult.SUCCESS.text = successTextTemplate.replace(`{i}`, place)
        .replace(`{n}`, `${scores.length}&nbsp;${gamersWord}`)
        .replace(`{p}`, percent);

    GameResult.SUCCESS.comparison = successComparisonTemplate.replace(`{i}`, place)
        .replace(`{m}`, `${minutes}&nbsp;${minutesWord}`)
        .replace(`{s}`, `${seconds}&nbsp;${secondsWord}`)
        .replace(`{p}`, `${this._score}&nbsp;${pointsWord}`)
        .replace(`{f}`, `${this._fastAnswers}&nbsp;${fastWord}`)
        .replace(`{e}`, `${this._mistakes}&nbsp;${mistakesWord}`);

    return GameResult.SUCCESS;
  }
}
