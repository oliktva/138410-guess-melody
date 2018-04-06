/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * @param {Array} answers
 * @return {number}
 */
export const getScore = function (answers) {
  if (answers.length < 10) {
    return -1;
  }

  return answers.reduce((score, answer) => {
    if (answer.result) {
      return answer.time < 30 ? score + 2 : score + 1;
    }

    return score - 2;
  }, 0);
};

/**
 * @param {number} count
 * @param {object} variants
 * @return {string}
 */
export const getDeclensionWord = function (count, variants) {
  if (count >= 5 && count <= 19 || count % 10 === 0) {
    return variants.many || variants.other;
  }
  if (count % 10 >= 2 && count % 10 <= 4) {
    return variants.few || variants.other;
  }
  if (count % 10 === 1) {
    return variants.one || variants.other;
  }
  return variants.other;
};

/**
 * @param {Array} otherScores
 * @param {object} ownResult
 * @return {string}
 */
export const getGameResult = function (otherScores = [], ownResult) {
  if (ownResult.score === -1) {
    if (!ownResult.time) {
      return `Время вышло! Вы не успели отгадать все мелодии`;
    }
    if (!ownResult.lives) {
      return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
    }
  }

  let scores = otherScores.slice();
  scores.push(ownResult.score);
  scores = scores.sort((a, b) => a - b);

  const position = scores.indexOf(ownResult.score);
  const place = scores.length - position;
  const percent = (position / scores.length) * 100;

  const gamers = getDeclensionWord(scores.length, {one: `игрока`, few: `игрока`, many: `игроков`, other: `игроков`});

  return `Вы заняли ${place}-ое место из ${scores.length} ${gamers}. Это лучше, чем у ${Math.round(percent)}% игроков`;
};
