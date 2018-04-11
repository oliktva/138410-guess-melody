/** @enum {number} */
export const KeyCodes = {
  ENTER: 13
};

/**
 * @param {string} markup
 * @return {Element}
 */
export const getElementFromTemplate = function (markup) {
  let template = document.createElement(`template`);
  template.innerHTML = markup.trim();
  return template.content.firstChild;
};

/**
 * @param {Element} element
 * @param {function} handler
 */
export const addClickEvent = function (element, handler) {
  element.addEventListener(`click`, handler);
  if (element.tagName !== `button`) {
    element.addEventListener(`keydown`, (evt) => {
      if (evt.keyCode === KeyCodes.ENTER) {
        handler();
      }
    });
  }
};

export const getHeaderTemplate = () => {
  return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;
};

/**
 * @param {object} state
 * @return {string}
 */
export const getTimerTemplate = (state) => {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${state.remainingTime.minutes}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${state.remainingTime.seconds}</span>
      </div>
    </svg>`
  );
};

/**
 * @param {object} state
 * @return {string}
 */
export const getErrorsTemplate = (state) => {
  let notes = [];
  for (let i = 0; i < state.errors; i++) {
    notes.push(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`);
  }

  return (
    `<div class="main-mistakes">
    ${notes.map((note) => note).join(``)}
    </div>`
  );
};

/**
 * @param {string} audioSrc
 * @return {string}
 */
export const getPlayerTemplate = (audioSrc) => {
  return (
    `<div class="player-wrapper">
      <div class="player">
        <audio src="${audioSrc}"></audio>
        <audio></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>`
  );
};
