/** @enum {number} */
export const DeclensionRule = {
  ZERO: 0,
  ONE: 1,
  FEW_MIN: 2,
  FEW_MAX: 4,
  MANY_MIN: 5,
  MANY_MAX: 19
};

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * @param {number} count
 * @return {boolean}
 */
const isMany = (count) => {
  return count >= DeclensionRule.MANY_MIN && count <= DeclensionRule.MANY_MAX || count % 10 === DeclensionRule.ZERO;
};

/**
 * @param {number} count
 * @return {boolean}
 */
const isFew = (count) => {
  return count % 10 >= DeclensionRule.FEW_MIN && count % 10 <= DeclensionRule.FEW_MAX;
};

/**
 * @param {number} count
 * @param {object} variants
 * @return {string}
 */
export const getDeclensionWord = (count, variants) => {
  if (isMany(count)) {
    return variants.many || variants.other;
  }
  if (isFew(count)) {
    return variants.few || variants.other;
  }
  if (count % 10 === DeclensionRule.ONE) {
    return variants.one || variants.other;
  }
  return variants.other;
};
