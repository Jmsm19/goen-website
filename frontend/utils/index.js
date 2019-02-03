import moment from 'moment';

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

/**
 * Capitalize the first letter of a given string
 *
 * @param {String} str
 */
export const capitalize = str => str[0].toUpperCase() + str.substring(1);
