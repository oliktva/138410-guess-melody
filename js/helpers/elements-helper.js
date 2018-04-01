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
