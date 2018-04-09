import {getDeclensionWord} from './utils.js';

/** @enum {number} */
export const GameLimit = {
  ANSWERS_VALUE: 10,
  MAX_FALSE_ANSWERS_VALUE: 3,
  FAST_ANSWER_TIME: 30
};

/** @enum {string} */
export const GameResult = {
  SUCCESS: `Вы заняли {i}-ое место из {n} {gamers}. Это лучше, чем у {p}% игроков`,
  ATTEMPTS_ENDED: `У вас закончились все попытки. Ничего, повезёт в следующий раз!`,
  TIME_OVER: `Время вышло! Вы не успели отгадать все мелодии`
};

/**
 * @param {Array} answers
 * @return {number}
 */
export const getScore = function (answers) {
  let falseAnswers = answers.filter((answer) => !answer.result);

  if (answers.length < GameLimit.ANSWERS_VALUE || falseAnswers.length === GameLimit.MAX_FALSE_ANSWERS_VALUE) {
    return -1;
  }

  return answers.reduce((score, answer) => {
    if (answer.result) {
      return answer.time < GameLimit.FAST_ANSWER_TIME ? score + 2 : score + 1;
    }

    return score - 2;
  }, 0);
};

/**
 * @param {Array} otherScores
 * @param {object} ownResult
 * @return {string}
 */
export const getGameResult = function (otherScores = [], ownResult) {
  if (ownResult.score === -1) {
    if (!ownResult.time) {
      return GameResult.TIME_OVER;
    }
    if (!ownResult.lives) {
      return GameResult.ATTEMPTS_ENDED;
    }
  }

  let scores = otherScores.slice();
  scores.push(ownResult.score);
  scores = scores.sort((a, b) => a - b);

  const position = scores.indexOf(ownResult.score);
  const place = scores.length - position;
  const percent = (position / scores.length) * 100;
  const gamers = getDeclensionWord(
      scores.length, {one: `игрока`, few: `игрока`, many: `игроков`, other: `игроков`}
  );

  return GameResult.SUCCESS.replace(`{i}`, place)
      .replace(`{n}`, scores.length)
      .replace(`{gamers}`, gamers)
      .replace(`{p}`, percent);
};
