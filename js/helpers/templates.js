export const getHeaderTemplate = () => {
  return `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;
};

/**
 * @param {object} remainingTime
 * @return {string}
 */
export const getTimerTemplate = (remainingTime) => {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${remainingTime.minutes}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${remainingTime.seconds}</span>
      </div>
    </svg>`
  );
};

/**
 * @param {number} errors
 * @return {string}
 */
export const getErrorsTemplate = (errors) => {
  let notes = [];
  for (let i = 0; i < errors; i++) {
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
 * @param {Boolean} autoplay
 * @return {string}
 */
export const getPlayerTemplate = (audioSrc, autoplay = false) => {
  let autoplayAttr = autoplay ? `autoplay` : ``;
  return (
    `<div class="player-wrapper">
      <div class="player">
        <audio src="${audioSrc}" ${autoplayAttr}></audio>
        <button class="player-control player-control--pause"></button>
        <div class="player-track">
          <span class="player-status"></span>
        </div>
      </div>
    </div>`
  );
};

/**
 * @param {object} answer
 * @param {number} index
 * @return {string}
 */
export const getArtistAnswerTemplate = (answer, index) => {
  return (
    `<div class="main-answer-wrapper">
      <input class="main-answer-r" type="radio" id="answer-${index}" name="answer" value="val-${index}"/>
      <label class="main-answer" for="answer-${index}">
        <img class="main-answer-preview" src="${answer.avatar}"
             alt="${answer.artist}" width="134" height="134">
        ${answer.artist}
      </label>
    </div>`
  );
};

/**
 * @param {object} answer
 * @param {number} index
 * @return {string}
 */
export const getGenreAnswerTemplate = (answer, index) => {
  return (
    `<div class="genre-answer">
      ${getPlayerTemplate(answer.audio.src)}
      <input type="checkbox" name="answer" value="answer-${index}" id="a-${index}">
      <label class="genre-answer-check" for="a-${index}"></label>
    </div>`
  );
};
