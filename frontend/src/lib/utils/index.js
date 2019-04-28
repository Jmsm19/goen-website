const { format } = require('date-fns');

const checkAndCallFn = fn => {
  if (typeof fn === 'function') {
    fn();
  }
};

/**
 * Capitalize the first letter of a given string
 *
 * @param {String} str
 */
export const capitalize = (string = '') => string[0].toUpperCase() + string.substr(1);

export const callFunctions = fn => {
  if (Array.isArray(fn)) {
    fn.map(f => checkAndCallFn(fn));
  } else {
    checkAndCallFn(fn);
  }
};

/**
 * Takes hours from DB (hhmmss) and formats it as "hh:mm a"
 *
 * @param {String} time
 * @returns {String} formatted time
 */
export const formatHoursFromDB = time => {
  const splitTime = time.split(':');
  const dateTime = new Date(1992, 1, 9, splitTime[0], splitTime[1]);
  return format(dateTime, 'hh:mm a');
};

/**
 * Return a formatted price in Bolivares based on locale
 *
 * @param {Number} price
 * @param {String} locale
 * @returns {String} Bs.S xxxxxxx
 */
export const formatPrice = (price, locale = 'es') =>
  `Bs.S ${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(price)}`;

export const localizeDate = (USDateString, locale = 'es') => {
  const date = new Date(Date.parse(USDateString));
  return new Intl.DateTimeFormat(locale).format(date);
};

/**
 * Return clan image address in assets folder
 *
 * @param {String} clanName
 * @returns {String} /assets/images/clans/{name}.png
 */
export const getClanImageAddress = clanName =>
  clanName ? `/images/clans/${clanName.toLowerCase()}.png` : null;

/**
 * Filter a given array of objects by the name property
 * @param {Array} array
 * @param {String} name
 */
export const filterArrayByName = (array, name) => {
  if (array.length) {
    return array.filter(item => RegExp(`${name}`, 'i').test(item.name));
  }
  return array;
};

/**
 * Get object by Id from array of objects
 * @param {Array} array
 * @param {String} id
 */
export const getObjectByIdFromArray = (array, id) => {
  if (array.length) {
    const filteredArr = array.filter(item => item.id === id);
    return filteredArr[0] || null;
  }
  return null;
};

/**
 *
 * @param {Array} objectArray
 */
export const createDictionaryOfIdsFromArray = objectArray => {
  const obj = {};
  objectArray.forEach(el => {
    obj[el.id] = { ...el };
  });
  return obj;
};
