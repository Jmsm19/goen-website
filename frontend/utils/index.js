import moment from 'moment';
import { notification } from 'antd';

/**
 * Capitalize the first letter of a given string
 *
 * @param {String} str
 */
export const capitalize = str => str[0].toUpperCase() + str.substring(1);

export const notifyError = ({ error, message }) => {
  notification.error({
    message: error || message,
  });
};

const checkAndCallFn = fn => {
  if (typeof fn === 'function') {
    fn();
  }
};

export const callFunctions = fn => {
  if (Array.isArray(fn)) {
    fn.map(f => checkAndCallFn(fn));
  } else {
    checkAndCallFn(fn);
  }
};

export const formatHoursFromDB = time => {
  const joinedTime = time.split(':').join('');
  return moment(joinedTime, 'HHmmss').format('hh:mm a');
};

export const formatPrice = (price, locale = 'es') =>
  `Bs.S ${new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
  }).format(price)}`;

export const localizeDate = (USDateString, locale = 'es') => {
  const date = new Date(Date.parse(USDateString));
  return new Intl.DateTimeFormat(locale).format(date);
};

export const todayIsBetween = (date1, date2) => {
  const today = moment().format('Y-MM-DD');
  return moment(today).isBetween(date1, date2, null, '[]');
};

export const getDayFromDate = (date, locale = 'es') => {
  const day = moment(new Date(date))
    .locale(locale)
    .format('dddd');
  return capitalize(day);
};

/**
 * Get component's display name
 * @param {*} Component
 */
export const getDisplayName = Component => Component.displayName || Component.name || 'Component';

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
