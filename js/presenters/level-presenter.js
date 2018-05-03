import App from '../app.js';

import LevelView from '../views/level-view.js';

import Timer from '../helpers/timer.js';

export default class LevelPresenter {
  /**
   * @param  {object} model
   */
  constructor(model) {
    this.model = model;
    this.timer = new Timer(this.model.remainingTime, () => {
      this.model.decreaseRemainingTime();
      this._updateTimer(this.model.remainingTime);
    });

    this.view = new LevelView(this.model);
    this.view.levelBlock.nextViewHandler = (evt) => {
      this._nextViewHandler(evt);
    };
  }

  show() {
    this.timer.start();
    this.view.show();
  }

  _stopGame() {
    this.timer.stop();
    App.showResult();
    this.view.clear();
  }

  /**
   * @param  {Event} evt
   */
  _nextViewHandler(evt) {
    evt.preventDefault();

    const isCorrect = this.model.checkAnswers(this.view.levelBlock.gamerAnswers);
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
      this.view.timerBlock.update(remainingTime);
    }
  }

  _updateMistakes() {
    this.view.mistakesBlock.update(this.model.mistakes);
  }

  _updateLevel() {
    this.view.updateLevel(this.model.currentLevelResource, this.model.audio, (evt) => this._nextViewHandler(evt));
  }
}
