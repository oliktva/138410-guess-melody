import {getElementFromTemplate, addClickEvent} from '../helpers/elements-helper.js';
import {renderScreen} from '../helpers/screens-helper.js';
import SuccessResultELement from './success-result-screen.js';
import TimeOverResultELement from './time-over-result-screen.js';
import AttemptsEndeedResultELement from './attempts-ended-result-screen.js';

const genreLevelScreenElement = getElementFromTemplate(
    `<section class="main main--level main--level-genre">
      <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
        <circle
          cx="390" cy="390" r="370"
          class="timer-line"
          style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">05</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">00</span>
        </div>
      </svg>
      <div class="main-mistakes">
        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
        <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      </div>

      <div class="main-wrap">
        <h2 class="title">Выберите инди-рок треки</h2>
        <form class="genre">
          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio></audio>
                <button class="player-control player-control--pause"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-1" id="a-1">
            <label class="genre-answer-check" for="a-1"></label>
          </div>

          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio></audio>
                <button class="player-control player-control--play"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-1" id="a-2">
            <label class="genre-answer-check" for="a-2"></label>
          </div>

          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio></audio>
                <button class="player-control player-control--play"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-1" id="a-3">
            <label class="genre-answer-check" for="a-3"></label>
          </div>

          <div class="genre-answer">
            <div class="player-wrapper">
              <div class="player">
                <audio></audio>
                <button class="player-control player-control--play"></button>
                <div class="player-track">
                  <span class="player-status"></span>
                </div>
              </div>
            </div>
            <input type="checkbox" name="answer" value="answer-1" id="a-4">
            <label class="genre-answer-check" for="a-4"></label>
          </div>

          <button class="genre-answer-send" type="submit" disabled>Ответить</button>
        </form>
      </div>
    </section>`
);

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * @return {Element}
 */
const getResultScreen = function () {
  switch (getRandom(0, 2)) {
    case 0:
      return SuccessResultELement;
    case 1:
      return TimeOverResultELement;
    default:
      return AttemptsEndeedResultELement;
  }
};

const answersCheckboxes = Array.from(genreLevelScreenElement.querySelectorAll(`.genre-answer input[type="checkbox"]`));
const answer = genreLevelScreenElement.querySelector(`.genre-answer-send`);

const answerHandler = function () {
  renderScreen(getResultScreen());
  answersCheckboxes.forEach((checkbox) => {
    checkbox.checked = false;
    answer.disabled = true;
  });
};

/**
 * @param {Event} evt
 */
const checkAnswersHandler = function (evt) {
  if (evt.target.checked || document.querySelectorAll(`.genre-answer input:checked`).length) {
    answer.disabled = false;
  } else {
    answer.disabled = true;
  }
};

addClickEvent(answer, answerHandler);
answersCheckboxes.forEach(
    (checkbox) => {
      checkbox.addEventListener(`change`, checkAnswersHandler);
    }
);

export default genreLevelScreenElement;
