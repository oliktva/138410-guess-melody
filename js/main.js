const SCREEN_SELECTOR = `section.main`;
const SCREEN_TYPES_WEIGHT = {welcome: 1, level: 2, result: 3};

const templates = document.querySelector(`#templates`);
const app = document.querySelector(`.app`);

let activeScreenIndex = 0;
let allScreens = [];

const sortScreens = function (screens) {
  return screens.sort(
      (a, b) => SCREEN_TYPES_WEIGHT[getScreenType(a)] - SCREEN_TYPES_WEIGHT[getScreenType(b)]
  );
};

const getScreenType = function (screen) {
  return screen.classList.value.match(/welcome|level|result/ig).shift();
};

const increaseActiveIndex = function () {
  activeScreenIndex = activeScreenIndex === allScreens.length - 1 ? 0 : activeScreenIndex + 1;
};

const decreaseActiveIndex = function () {
  activeScreenIndex = activeScreenIndex === 0 ? allScreens.length - 1 : activeScreenIndex - 1;
};

const updateActiveIndex = function (keyCode) {
  if (keyCode === 39) {
    increaseActiveIndex();
  } else if (keyCode === 37) {
    decreaseActiveIndex();
  }
};

const renderScreen = function () {
  if (allScreens.length) {
    const activeScreen = document.querySelector(SCREEN_SELECTOR);
    app.replaceChild(allScreens[activeScreenIndex], activeScreen);
  }
};

const screenSwitcherHandler = function (evt) {
  if (evt.altKey && (evt.keyCode === 37 || evt.keyCode === 39)) {
    updateActiveIndex(evt.keyCode);
    renderScreen();
  }
};

if (`content` in templates) {
  const screens = Array.from(templates.content.querySelectorAll(SCREEN_SELECTOR));
  allScreens = sortScreens(screens);
  renderScreen();

  document.addEventListener(`keydown`, screenSwitcherHandler);
}
