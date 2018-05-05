import AbstractView from '../views/abstract-view.js';

/** @param {Element} current */
const stopOther = (current) => {
  Array.from(document.querySelectorAll(`audio`)).forEach((audio) => {
    if (!(audio === current || audio.paused)) {
      audio.pause();
      audio.currentTime = 0;
    }
  });
};

/**
 * @param {Element} element
 * @param {string} className
 */
const addClass = (element, className) => {
  if (element) {
    element.classList.add(className);
  }
};

/**
 * @param {Element} element
 * @param {string} className
 */
const removeClass = (element, className) => {
  if (element) {
    element.classList.remove(className);
  }
};

export default class PlayerBlock extends AbstractView {
  /**
   * @param {object} audio
   * @param {boolean} autoplay
  */
  constructor(audio) {
    super();
    this._audio = audio;
    this._audio.addEventListener(`play`, this.playAudioHandler);
    this._audio.addEventListener(`pause`, this.pauseAudioHandler);
  }

  /** @return {string} */
  get template() {
    return (
      `<div class="player-wrapper">
        <div class="player">
          <div class="player-audio"></div>
          <button class="player-control player-control--play"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`
    );
  }

  /** @return {Element} */
  get element() {
    const element = super.element;
    element.querySelector(`.player-audio`).appendChild(this._audio);
    return element;
  }

  /**
   * @param {Element} target
   */
  playAudioHandler({target}) {
    const buttonElement = target.parentElement.nextElementSibling;

    stopOther(target);
    removeClass(buttonElement, `player-control--play`);
    addClass(buttonElement, `player-control--pause`);
  }

  /**
   * @param {Element} target
   */
  pauseAudioHandler({target}) {
    const buttonElement = target.parentElement.nextElementSibling;

    removeClass(buttonElement, `player-control--pause`);
    addClass(buttonElement, `player-control--play`);
  }

  /** @param {Event} evt */
  _playerHandler(evt) {
    evt.preventDefault();

    if (this._audio.paused) {
      this._audio.play();
    } else {
      this._audio.pause();
    }
  }

  /** @param {Element} element */
  bind(element) {
    element.querySelector(`.player-control`).addEventListener(`click`, (evt) => this._playerHandler(evt));
  }

  clear() {
  //   if (this._element) {
  //     this._audio.removeEventListener(`play`, this.playAudioHandler);
  //     this._audio.removeEventListener(`pause`, this.pauseAudioHandler);
  //     this._audio.currentTime = 0;
  //   }
  }
}
