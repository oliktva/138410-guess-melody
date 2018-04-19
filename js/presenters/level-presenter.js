import App from '../app.js';

import LevelView from '../views/level-view.js';

import TimerBlock from '../components/timer-block.js';
import MistakesBlock from '../components/mistakes-block.js';
import ArtistBlock from '../components/artist-block.js';
import GenreBlock from '../components/genre-block.js';

import Timer from '../helpers/timer.js';

import {ARTIST} from '../game-data.js';

/**
 * @param {Element} element
 * @param {string} selector
 */
const updateElement = (element, selector) => {
  if (element) {
    const activeScreen = document.querySelector(selector);
    activeScreen.parentElement.replaceChild(element, activeScreen);
  }
};

export default class WelcomePresenter {
  constructor(model) {
    this.model = model;
    this.view = new LevelView({type: this.model.currentLevelResource.type});

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

  get element() {
    this.timer.start();

    this.view.element.appendChild(this.timerBlock.element);
    this.view.element.appendChild(this.mistakesBlock.element);
    this.view.element.appendChild(this.levelBlock.element);

    return this.view.element;
  }

  /**
   * @param  {Array} answersIndeces
   * @return {boolean}
   */
  _checkAnswers(answersIndeces) {
    const {answers} = this.model.currentLevelResource;

    return answers.reduce((result, answer, index) => {
      if (answer.correct) {
        return result && answersIndeces.includes(index);
      } else {
        return result && !answersIndeces.includes(index);
      }
    }, true);
  }

  _stopGame() {
    this.timer.stop();
    App.showResult();
  }

  _nextViewHandler(evt) {
    evt.preventDefault();

    const isCorrect = this._checkAnswers(this.levelBlock.gamerAnswers);
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
    this.levelBlock.clear();
    this.levelBlock = this.model.currentLevelResource.type === ARTIST ? new ArtistBlock(this.model.currentLevelResource) : new GenreBlock(this.model.currentLevelResource);
    this.levelBlock.nextViewHandler = (event) => {
      this._nextViewHandler(event);
    };

    updateElement(this.levelBlock.element, this.levelBlock.elementSelector);
  }
}
