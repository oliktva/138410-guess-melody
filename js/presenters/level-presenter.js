import App from '../app.js';

import LevelView from '../views/level-view.js';

import TimerBlock from '../components/timer-block.js';
import MistakesBlock from '../components/mistakes-block.js';
import ArtistBlock from '../components/artist-block.js';
import GenreBlock from '../components/genre-block.js';

import Timer from '../helpers/timer.js';

import {ARTIST} from '../game-data.js';

export default class WelcomePresenter {
  /**
   * @param  {object} model
   */
  constructor(model) {
    this.model = model;
    this.view = new LevelView();

    const level = this.model.currentLevelResource;
    const time = this.model.remainingTime;

    this.timer = new Timer(time, () => {
      this.model.decreaseRemainingTime();
      this._updateTimer(this.model.remainingTime);
    });
    this.timerBlock = new TimerBlock(time);
    this.mistakesBlock = new MistakesBlock(this.model.mistakes);
    this.levelBlock = level.type === ARTIST ? new ArtistBlock(level) : new GenreBlock(level);

    this.levelBlock.nextViewHandler = (evt) => {
      this._nextViewHandler(evt);
    };
  }

  /**
   * @return {Element}
   */
  get element() {
    this.timer.start();

    this.view.element.appendChild(this.timerBlock.element);
    this.view.element.appendChild(this.mistakesBlock.element);
    this.view.element.appendChild(this.levelBlock.element);

    return this.view.element;
  }

  _stopGame() {
    this.timer.stop();
    App.showResult();
    this.levelBlock.clear();
    this.timerBlock.clear();
    this.mistakesBlock.clear();
    this.view.clear();
  }

  /**
   * @param  {Event} evt
   */
  _nextViewHandler(evt) {
    evt.preventDefault();

    const isCorrect = this.model.checkAnswers(this.levelBlock.gamerAnswers);
    this.model.addGamerResult({result: isCorrect, time: this.model.remainingTime});

    if (!isCorrect) {
      this.model.addMistake();
      this._updateMistakes();
    }

    if (this.model.isGameOver()) {
      this._stopGame();
    } else {
      this.model.setLevelUp();
      this._updateLevel();
    }
  }

  /**
   * @param  {number} remainingTime
   */
  _updateTimer(remainingTime) {
    if (remainingTime === 0) {
      this._stopGame();
    } else {
      this.timerBlock.update(remainingTime);
    }
  }

  _updateMistakes() {
    this.mistakesBlock.update(this.model.mistakes);
  }

  _updateLevel() {
    const view = this.model.currentLevelResource.type === ARTIST ? new ArtistBlock(this.model.currentLevelResource) : new GenreBlock(this.model.currentLevelResource);
    view.nextViewHandler = (event) => {
      this._nextViewHandler(event);
    };

    this._updateLevelView(view, this.levelBlock);
  }

  /**
   * @param  {object} newView
   */
  _updateLevelView(newView) {
    this.view.element.replaceChild(newView.element, this.levelBlock.element);
    this.levelBlock = newView;
  }
}
