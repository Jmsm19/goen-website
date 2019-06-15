import { format } from 'date-fns';

const checkAndCallFn = (fn: Function) => {
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

export const callFunctions = (fn: Callbacks) => {
  if (Array.isArray(fn)) {
    fn.map(f => checkAndCallFn(f));
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
export const formatHoursFromDB = (time: string) => {
  const splitTime = time.split(':');
  const dateTime = new Date(1992, 1, 9, +splitTime[0], +splitTime[1]);
  return format(dateTime, 'hh:mm a');
};

/**
 * Return a formatted price in Bolivares based on locale
 *
 * @param {Number} price
 * @param {String} locale
 * @returns {String} Bs.S xxxxxxx
 */
export const formatPrice = (price: number, locale = 'es') =>
  `Bs.S ${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(price)}`;

export const localizeDate = (USDateString: string, locale = 'es', options = {}) => {
  const date = new Date(Date.parse(USDateString));
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    ...options,
  }).format(date);
};

/**
 * Return clan image address in assets folder
 *
 * @param {String} clanName
 * @returns {String} /assets/images/clans/{name}.png
 */
export const getClanImageAddress = (clanName: string) =>
  clanName ? `/images/clans/${clanName.toLowerCase()}.png` : null;

/**
 * Filter a given array of objects by a property
 * @param {Array} array
 * @param {String} key
 * @param {String|Number} value
 * @param {Array} array
 * @returns {Array}
 */
export const filterArrayBy = (key: string, value: string, array: []) => {
  if (array.length && !!value) {
    return array.filter(item => RegExp(`${value}`, 'i').test(item[key]));
  }
  return array;
};

/**
 * Get object by Id from array of objects
 * @param {Array} array
 * @param {String} id
 */
export const getObjectByIdFromArray = (array: ObjectWithId[], id: string) => {
  if (array.length) {
    const filteredArr = array.filter(item => item.id === id);
    return filteredArr[0] || null;
  }
  return null;
};

export const createDictionaryItem = (object: ObjectWithId) => ({
  [object.id]: { ...object },
});

/**
 *
 * @param {Array} objectArray
 */
export const createDictionaryOfIdsFromArray = (objectArray: ObjectWithId[]) => {
  let obj = {};
  objectArray.forEach(el => {
    obj = { ...obj, ...createDictionaryItem(el) };
  });
  return obj;
};

/**
 * Create a Map object
 *
 * @param {Object} [initialProperties={}]
 * @returns {Map} map
 */
export const createMap = (initialProperties?: { [k: string]: any }) => {
  const map = new Map();
  const propertyKeys = Object.keys(initialProperties || {});

  propertyKeys.forEach((key: any) =>
    map.set(key, initialProperties ? initialProperties[key] : false || undefined),
  );

  return map;
};

export const createArrayFromMap = (map = new Map()) => {
  const array: any[] = [];
  map.forEach(object => array.push(object));

  return array;
};

export const formatNationalId = (nationalId: number) =>
  new Intl.NumberFormat('es').format(nationalId);

export const snakeCaseToCamelCase = (string: string) => {
  const splitText = string.split('_');
  return splitText.map((word, index) => (index === 0 ? word : capitalize(word))).join('');
};

/**
 * Sort modules by name and section in descending order
 *
 * @param {Array} modules Array of Modules obj
 * @returns {Array} sorted array
 */
export const sortModules = (modules: Module[]) =>
  modules.sort((a, b) =>
    a.name > b.name || (a.name === b.name && a.section > b.section) ? 1 : -1,
  );

export const filterModulesByNumber = (modules: Module[] = [], min = 0, max = 0) => {
  let filteredModules: Module[] = [];

  if (modules) {
    filteredModules = modules.filter(module => {
      const regexNumber = RegExp(/M-(\d+)/).exec(module.name);

      if (!regexNumber) {
        throw Error('No module number found on array');
      }

      const moduleNumber = +regexNumber[1];

      return moduleNumber >= min && moduleNumber <= max;
    });
  }
  return filteredModules;
};

export const generateSnackbarConfig = (
  variant: 'default' | 'error' | 'success' | 'warning' | 'info',
  horizontal: 'left' | 'center' | 'right' = 'center',
  vertical: 'top' | 'bottom' = 'top',
  extraOptions = {},
) => ({
  variant,
  anchorOrigin: {
    horizontal,
    vertical,
  },
  ...extraOptions,
});

// persist: true,
// preventDuplicate: true,
