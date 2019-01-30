/* eslint-disable import/prefer-default-export */
// To be used with Formik validation
import * as Yup from 'yup';
import moment from 'moment';

export const hasErrors = (fieldName, errors, touched, fieldErrors = []) =>
  (touched[fieldName] && errors[fieldName]) || fieldErrors.includes(fieldName);

export const periodFormValidation = t =>
  Yup.object().shape({
    signup_from: Yup.date().required(t('Required')),
    signup_until: Yup.date()
      .when('signup_from', (st, _) => {
        const dayAfter = moment(st)
          .add(1, 'days')
          .toDate();
        return Yup.date().min(dayAfter, t('MustBeAfterSignupFrom'));
      })
      .required(t('Required')),
  });
