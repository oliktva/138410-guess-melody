import App from './app.js';

App.showWelcome();

// import {changeView, getRandom} from './helpers/utils.js';
// import {GameLimit} from './helpers/result.js';
// import {calculateScore, getGameResult} from './helpers/result.js';
//
// import WelcomeView from './views/welcome-view.js';
// import ArtistLevelView from './views/artist-level-view.js';
// import GenreLevelView from './views/genre-level-view.js';
// import ResultView from './views/result-view.js';
//
// import {state, ARTIST} from './game-data.js';
//
// const welcomeView = new WelcomeView();
//
// const isArtistLevel = (levels) => {
//   const {resources, current} = levels;
//
//   return resources[current].type === ARTIST;
// };
//
// /** @param {Array} answersIndeces */
// const checkAnswers = (answersIndeces) => {
//   const {levels: {current, resources}} = state;
//   const currentAnswers = resources[current].answers;
//   let isCorrect = false;
//
//   isCorrect = currentAnswers.reduce((result, answer, index) => {
//     if (answer.correct) {
//       return result && answersIndeces.includes(index);
//     } else {
//       return result && !answersIndeces.includes(index);
//     }
//   }, true);
//
//   if (isCorrect) {
//     state.gamerResults.push({result: isCorrect, time: getRandom(0, 30)});
//   } else {
//     state.mistakes++;
//   }
// };
//
// const getNewArtistView = () => {
//   const artistLevelView = new ArtistLevelView(state);
//
//   artistLevelView.nextViewHandler = (evt) => {
//     const answer = evt.target;
//     if (answer.tagName.toLowerCase() === `input`) {
//       checkAnswers([answer.value.substr(-1) - 1]);
//       evt.preventDefault();
//       changeView(getNextView().element);
//     }
//   };
//
//   return artistLevelView;
// };
//
// const getNewGenreView = () => {
//   const genreLevelView = new GenreLevelView(state);
//
//   genreLevelView.nextViewHandler = (evt) => {
//     evt.preventDefault();
//     const answers = Array.from(document.querySelectorAll(`.genre-answer input:checked`));
//     checkAnswers(answers.map((answer) => answer.value.substr(-1) - 1));
//     changeView(getNextView().element);
//   };
//
//   return genreLevelView;
// };
//
// const getNewResultView = () => {
//   const score = calculateScore(state.gamerResults);
//   const result = getGameResult(
//       {score, mistakes: state.mistakes}, state.results
//   );
//   const resultView = new ResultView(result);
//
//   resultView.replayHandler = (evt) => {
//     evt.preventDefault();
//     state.mistakes = 0;
//     state.levels.current = 0;
//     state.gamerResults = [];
//     if (score !== -1) {
//       state.results.push(score);
//     }
//     changeView(welcomeView.element);
//   };
//
//   return resultView;
// };
//
// /** @return {Element} */
// const getNextView = () => {
//   if (state.mistakes === GameLimit.MAX_FALSE_ANSWERS_VALUE || state.levels.current === GameLimit.LEVELS_VALUE - 1) {
//     return getNewResultView();
//   }
//   state.levels.current++;
//   if (isArtistLevel(state.levels)) {
//     return getNewArtistView();
//   }
//
//   return getNewGenreView();
// };
//
// const getLevelView = () => {
//   if (isArtistLevel(state.levels)) {
//     return getNewArtistView();
//   }
//
//   return getNewGenreView();
// };
//
// welcomeView.startGameHandler = () => {
//   changeView(getLevelView().element);
// };
//
// changeView(welcomeView.element);
