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
