import AbstractView from './abstract-view.js';

export default class PlayerView extends AbstractView {
  constructor(audio, autoplay) {
    super();
    this.audio = audio;
    this.autoplay = autoplay;
  }

  get template() {
    const autoplayAttr = this.autoplay ? `autoplay` : ``;

    return (
      `<div class="player-wrapper">
        <div class="player">
          <audio src="${this.audio.src}" ${autoplayAttr}></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`
    );
  }
}
