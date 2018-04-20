import AbstractView from '../views/abstract-view.js';

const toggleButton = (element) => {
  element.classList.toggle(`player-control--pause`);
  element.classList.toggle(`player-control--play`);
};

export default class PlayerBlock extends AbstractView {
  /**
   * @param {object} audio
   * @param {boolean} autoplay
  */
  constructor(audio, autoplay = false) {
    super();
    this._audio = audio;
    this._autoplay = autoplay;
    this._isPlaying = autoplay;
  }

  /** @return {string} */
  get template() {
    const autoplayAttr = this._autoplay ? ` autoplay` : ``;
    const mod = this._autoplay ? `pause` : `play`;

    return (
      `<div class="player-wrapper">
        <div class="player">
          <audio src="${this._audio.src}"${autoplayAttr}></audio>
          <button class="player-control player-control--${mod}"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`
    );
  }

  _stopOther() {
    Array.from(document.querySelectorAll(`audio`)).forEach((audio) => {
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        toggleButton(audio.nextElementSibling);
      }
    });
  }

  /** @param {Event} evt */
  _playerHandler(evt) {
    evt.preventDefault();
    const audio = this._element.querySelector(`.player audio`);
    this._stopOther();

    if (this._isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    toggleButton(evt.target);
    this._isPlaying = !this._isPlaying;
  }

  /** @param {Element} element */
  bind(element) {
    element.querySelector(`.player-control`).addEventListener(`click`, (evt) => this._playerHandler(evt));
  }
}
