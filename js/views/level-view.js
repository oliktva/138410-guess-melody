import AbstractView from './abstract-view.js';

import TimerBlock from '../components/timer-block.js';
import MistakesBlock from '../components/mistakes-block.js';
import ArtistBlock from '../components/artist-block.js';
import GenreBlock from '../components/genre-block.js';

import {ARTIST} from '../game-data.js';

export default class LevelView extends AbstractView {
  /**
   * @param  {Object} props
   */
  constructor(props) {
    super();
    this._props = props;
    const level = this._props.currentLevelResource;
    const time = this._props.remainingTime;
    const audio = this._props.audio;

    this.timerBlock = new TimerBlock(time);
    this.mistakesBlock = new MistakesBlock(this._props.mistakes);
    this.levelBlock = level.type === ARTIST ? new ArtistBlock({level, audio}) : new GenreBlock({level, audio});
  }

  /** @return {string} */
  get template() {
    return `<section class="main main--level"></section>`;
  }

  get element() {
    const element = super.element;
    if (!element.childNodes.length) {
      element.appendChild(this.timerBlock.element);
      element.appendChild(this.mistakesBlock.element);
      element.appendChild(this.levelBlock.element);
    }
    return element;
  }

  _playFirstAudio() {
    this.element.querySelector(`audio`).play();
  }

  show() {
    super.show();
    this._playFirstAudio();
  }

  updateLevel(currentLevelResource, audio, nextViewHandler) {
    const newView = currentLevelResource.type === ARTIST ?
      new ArtistBlock({level: currentLevelResource, audio}) :
      new GenreBlock({level: currentLevelResource, audio});

    newView.nextViewHandler = nextViewHandler;

    this.element.replaceChild(newView.element, this.levelBlock.element);
    this.levelBlock = newView;
    this._playFirstAudio();
  }

  clear() {
    this.levelBlock.clear();
    this.timerBlock.clear();
    this.mistakesBlock.clear();
  }
}
