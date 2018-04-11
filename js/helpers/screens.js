/**
 * @param {Element} screen
 */
export const renderScreen = (screen) => {
  if (screen) {
    const activeScreen = document.querySelector(`.main`);
    activeScreen.parentElement.replaceChild(screen, activeScreen);
  }
};
