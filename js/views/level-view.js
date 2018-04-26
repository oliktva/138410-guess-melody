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

    this.timerBlock = new TimerBlock(time);
    this.mistakesBlock = new MistakesBlock(this._props.mistakes);
    this.levelBlock = level.type === ARTIST ? new ArtistBlock(level) : new GenreBlock(level);
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

  updateLevel(currentLevelResource, nextViewHandler) {
    const newView = currentLevelResource.type === ARTIST ?
      new ArtistBlock(currentLevelResource) :
      new GenreBlock(currentLevelResource);

    newView.nextViewHandler = nextViewHandler;

    this.element.replaceChild(newView.element, this.levelBlock.element);
    this.levelBlock = newView;
  }

  clear() {
    this.levelBlock.clear();
    this.timerBlock.clear();
    this.mistakesBlock.clear();
  }
}
