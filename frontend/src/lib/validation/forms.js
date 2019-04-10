/* eslint-disable import/prefer-default-export */
// To be used with Formik validation
import * as Yup from 'yup';
import moment from 'moment';
import { days } from './constants';

export const hasErrors = (fieldName, errors, touched, fieldErrors = []) =>
  (touched[fieldName] && errors[fieldName]) || fieldErrors.includes(fieldName);

export const periodFormValidation = t =>
  Yup.object().shape({
    signup_from: Yup.date().required(t('Required')),
    signup_until: Yup.date()
      .when('signup_from', (value, _) => {
        const dayAfter = moment(value)
          .add(1, 'days')
          .toDate();
        return Yup.date().min(dayAfter, t('MustBeAfterSignupFrom'));
      })
      .required(t('Required')),
  });

export const moduleFormValidation = t =>
  Yup.object().shape({
    name: Yup.string().required(t('Required')),
    section: Yup.string().required(t('Required')),
    schedule_id: Yup.number().required(t('Required')),
    clan_id: Yup.number().when('name', (value, _) => {
      if (value === 'M-0') {
        return Yup.number().required(t('Required'));
      }
      return Yup.number();
    }),
  });

export const scheduleFormValidation = t =>
  Yup.object().shape({
    day: Yup.string()
      .oneOf(days, t('InvalidDay'))
      .required(t('Required')),
    from: Yup.string().required(t('Required')),
    until: Yup.string()
      .when('from', (fromValue, _) =>
        Yup.string().test('is-after-start-time', t('MustBeAfterStartTime'), untilValue =>
          moment(untilValue, 'hh:mm').isAfter(moment(fromValue, 'hh:mm')),
        ),
      )
      .required(t('Required')),
  });
