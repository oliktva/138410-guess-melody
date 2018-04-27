import {copyObject} from './helpers/utils.js';

/** @constant {string} */
export const ARTIST = `artist`;
export const GENRE = `genre`;

/** @enum {number} */
export const GameLimit = {
  LEVELS_VALUE: 10,
  MAX_FALSE_ANSWERS_VALUE: 3,
  FAST_ANSWER_TIME: 30,
  TIME: 300
};

/**
 * @param {Array} data
 * @return {Array}
 */
export const adaptData = (data) => {
  return data.map((level) => {
    let result = {};
    result.type = level.type;
    if (level.type === ARTIST) {
      result.question = {
        title: level.question,
        audio: level.src
      };

      result.answers = level.answers.map((answer) => ({
        artist: answer.title,
        avatar: answer.image.url,
        isCorrect: answer.isCorrect
      }));
    } else {
      result.question = {
        title: level.question
      };

      result.answers = level.answers.map((answer) => ({
        audio: answer.src,
        isCorrect: answer.genre === level.genre
      }));
    }
    return result;
  });
};

/**
 * @param {Array} results
 * @return {Array}
 */
export const adaptResults = (results) => {
  if (!results.length) {
    return results;
  }

  return results.map((result) => result.score);
};

const initialState = Object.freeze({
  remainingTime: GameLimit.TIME,
  mistakes: 0,
  gamerResults: [],
  results: [],
  levels: {
    current: 0
  }
});

const state = copyObject(initialState);

/**
 * @param {string} key
 * @param {Array} data
 */
export const updateState = (key, data) => {
  if (key === `resources`) {
    state.levels.resources = data;
  }
  if (key === `results`) {
    state.results = data;
  }
};

/** @return {object} */
export const getState = () => {
  return state;
};

export const clearState = () => {
  state.remainingTime = GameLimit.TIME;
  state.mistakes = 0;
  state.gamerResults = [];
  state.levels.current = 0;
};
