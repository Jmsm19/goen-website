import { i18n } from '../i18n';

export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = i18n.t('common:Required');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = i18n.t('common:InvalidEmail');
  }
  return error;
}

export const validatePassword = (value) => {
  let error;
  if (!value) {
    error = i18n.t('common:Required');;
  } else if (value.length < 6) {
    error = i18n.t('common:TooShort', { minimum: 6 });
  }
  return error;
}