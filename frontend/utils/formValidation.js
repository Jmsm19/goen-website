/* eslint-disable import/prefer-default-export */
// To be used with Formik validation

export const hasErrors = (fieldName, errors, touched, fieldErrors = []) =>
  (touched[fieldName] && errors[fieldName]) || fieldErrors.includes(fieldName);
