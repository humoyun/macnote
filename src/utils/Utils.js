/**
 * @param {string} path
 * @returns {Boolean}
 */

const Utils = {};
Utils.isExternal = path => {
  return /^(https?:|mailto:|tel:)/.test(path);
};

export default Utils;
