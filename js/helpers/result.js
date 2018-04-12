import {getDeclensionWord} from './utils.js';

/** @enum {number} */
export const GameLimit = {
  ANSWERS_VALUE: 10,
  MAX_FALSE_ANSWERS_VALUE: 3,
  FAST_ANSWER_TIME: 30
};

const successTextTemplate = `Вы&nbsp;заняли {i}-ое место из&nbsp;{n}.<br>Это лучше, чем у&nbsp;{p}% игроков`;
const successComparisonTemplate = `За&nbsp;{m} и {s}<br>вы&nbsp;набрали {p} ({f} быстрых)<br>совершив {e}`;

/** @enum {object} */
export const GameResult = {
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

/**
 * @param {Array} answers
 * @return {number}
 */
export const getScore = (answers) => {
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
 * @param {object} ownResult
 * @param {Array} otherScores
 * @return {object}
 */
export const getGameResult = (ownResult, otherScores = []) => {
  if (ownResult.score === -1) {
    if (ownResult.errors === GameLimit.MAX_FALSE_ANSWERS_VALUE) {
      return GameResult.ATTEMPTS_ENDED;
    }
    return GameResult.TIME_OVER;
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
  const minutes = getDeclensionWord(
      3, {one: `минуту`, few: `минуты`, many: `минут`, other: `минуты`}
  );
  const seconds = getDeclensionWord(
      1, {one: `секунду`, few: `секунды`, many: `секунд`, other: `секунды`}
  );
  const points = getDeclensionWord(
      ownResult.score, {one: `балл`, few: `балла`, many: `баллов`, other: `балла`}
  );
  const errors = getDeclensionWord(
      2, {one: `ошибку`, few: `ошибки`, many: `ошибок`, other: `ошибки`}
  );

  GameResult.SUCCESS.text = successTextTemplate.replace(`{i}`, place)
      .replace(`{n}`, `${scores.length}&nbsp;${gamers}`)
      .replace(`{p}`, percent);

  GameResult.SUCCESS.comparison = successComparisonTemplate.replace(`{i}`, place)
      .replace(`{m}`, `${3}&nbsp;${minutes}`)
      .replace(`{s}`, `${1}&nbsp;${seconds}`)
      .replace(`{p}`, `${ownResult.score}&nbsp;${points}`)
      .replace(`{f}`, `8`)
      .replace(`{e}`, `${2}&nbsp;${errors}`);

  return GameResult.SUCCESS;
};
