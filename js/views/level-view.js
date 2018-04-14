import AbstractView from './abstract-view.js';
import TimerView from './timer-view.js';
import MistakesView from './mistakes-view.js';
import ArtistLevelView from './artist-level-view.js';
import GenreLevelView from './genre-level-view.js';

import {ARTIST} from '../game-data.js';

export default class LevelView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const {remainingTime, mistakes, level} = this.state;
    const timerView = new TimerView(remainingTime);
    const mistakesView = new MistakesView(mistakes);
    const levelView = level.type === ARTIST ?
      new ArtistLevelView(level.resources) :
      new GenreLevelView(level.resources);

    return (
      `<section class="main main--level main--level-${level.type}">
        ${timerView.template}
        ${mistakesView.template}
        ${levelView.template}
      </section>`
    );
  }

  bind() {
    if (this.element && typeof this.startGameHandler === `function`) {
      const startGame = this.element.querySelector(`.main-play`);
      startGame.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.startGameHandler();
      });
    }
  }
}
