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
        isCorrect: answer.genre === data.genre
      }));
    }
    return result;
  });
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

export const getState = () => {
  const state = copyObject(initialState);
  return state;
};
