/* eslint-disable camelcase */
import { i18n } from '../i18n';

// To be used with Formik validation
export const hasErrors = (fieldName, errors, touched, fieldErrors = []) =>
  (touched[fieldName] && errors[fieldName]) || fieldErrors.includes(fieldName);

// Field specific validations
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

export const validatePasswordConfirmation = ({password, password_confirmation}) => {
  const bothPasswordHaveContent = password.length > 0 && password_confirmation.length > 0;

  if (bothPasswordHaveContent && password !== password_confirmation) {
    return {
      password_confirmation: i18n.t('common:PasswordNotEqual')
    }
  }
  return {};
}

export const validateTextField = (value) => {
  let error;
  if (!value) {
    error = i18n.t('common:Required');;
  }
  return error;
}

export const validatePhoneNumber = (value) => {
  let error;
  if (!value) {
    error = i18n.t('common:Required');;
  } else if (!/^[0-9]{3,4}-[0-9]{7}$/i.test(value)) {
    error = i18n.t('common:WrongPhoneFormat');
  }
  return error;
}

export const validateBirthDateField = (value) => {
  let error;

  if (!value) {
    return i18n.t('common:Required');;
  }
  // Minimum Age
  const minimumAge = 14;
  // Age Calulation
  const date = new Date(value);
  const ageDifMs = Date.now() - date.getTime();
  const ageDate = new Date(ageDifMs); // miliseconds from epoch
  const age =  Math.abs(ageDate.getUTCFullYear() - 1970);

  if (age < minimumAge) {
    error = i18n.t('common:Underage', {age: minimumAge})
  }

  return error;
}