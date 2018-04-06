/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * @param {number} count
 * @param {object} variants
 * @return {string}
 */
export const getDeclensionWord = function (count, variants) {
  if (count >= 5 && count <= 19 || count % 10 === 0) {
    return variants.many || variants.other;
  }
  if (count % 10 >= 2 && count % 10 <= 4) {
    return variants.few || variants.other;
  }
  if (count % 10 === 1) {
    return variants.one || variants.other;
  }
  return variants.other;
};
