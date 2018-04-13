import {getElementFromTemplate, addClickEvent} from '../helpers/elements.js';
import {getHeaderTemplate} from '../helpers/templates.js';
import {renderScreen} from '../helpers/screens.js';
import {getScore, getGameResult} from '../helpers/result.js';
import welcomeScreenElement from './welcome-screen.js';

import {state} from '../game-data.js';

/** @return {string} */
const getLevelTemplate = () => {
  const result = {
    score: getScore(state.results),
    errors: state.errors
  };

  let data = getGameResult(result, state.allResults);
  state.allResults.push(result.score);

  return (
    `<section class="main main--result">
      ${getHeaderTemplate()}
      <h2 class="title">${data.title}</h2>
      <div class="main-stat">${data.text}</div>
      ${data.comparison ? `<span class="main-comparison">${data.comparison}</span>` : ``}
      <span role="button" tabindex="0" class="main-replay">${data.action}</span>
    </section>`
  );
};

const replayHandler = () => {
  state.errors = 0;
  state.levels.current = 0;
  state.results = [];
  renderScreen(welcomeScreenElement());
};

/** @return {Element} */
const resultScreenElement = () => {
  let element = getElementFromTemplate(getLevelTemplate());
  const replayGame = element.querySelector(`.main-replay`);
  addClickEvent(replayGame, replayHandler);

  return element;
};

export default resultScreenElement;
