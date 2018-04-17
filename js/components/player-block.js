import AbstractView from '../views/abstract-view.js';

export default class PlayerBlock extends AbstractView {
  /**
   * @param {object} audio
   * @param {boolean} autoplay
  */
  constructor(audio, autoplay) {
    super();
    this._audio = audio;
    this._autoplay = autoplay;
  }

  /** @return {string} */
  get template() {
    const autoplayAttr = this._autoplay ? ` autoplay` : ``;

    return (
      `<div class="player-wrapper">
        <div class="player">
          <audio src="${this._audio.src}"${autoplayAttr}></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`
    );
  }
}
