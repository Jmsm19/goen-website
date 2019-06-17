/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';
import i18n from 'i18next';
import { addDays, isDate } from 'date-fns';
// import { days } from '../config/constants';

export const getPeriodFormValidation = (t: i18n.TFunction) => ({
  initialValues: {},
  schema: Yup.object().shape({
    signup_from: Yup.string().required(t('Required')),
    signup_until: Yup.date()
      .required(t('Required'))
      .when('signup_from', (value: string, schema: Yup.DateSchema, selfRef: any) => {
        // TODO: Recheck this validation once Formal updates -> validateOnChange, onBlur, etc.
        if (value && selfRef.parent && isDate(selfRef.parent.signup_until)) {
          const dayAfter = addDays(value, 1);
          return Yup.date()
            .required(t('Required'))
            .min(dayAfter, t('MustBeAfterSignupFrom'));
        }
        return schema;
      }),
  }),
});

export const getPeriodUpdateValidation = (t: i18n.TFunction) => ({
  initialValues: {},
  schema: Yup.object().shape({
    year: Yup.string()
      .required(t('Required'))
      .min(4)
      .max(4),
    name: Yup.string().required(t('Required')),
    signup_from: Yup.string().required(t('Required')),
    signup_until: Yup.date()
      .required(t('Required'))
      .when('signup_from', (value: string, schema: Yup.DateSchema, selfRef: any) => {
        // TODO: Recheck this validation once Formal updates -> validateOnChange, onBlur, etc.
        if (value && selfRef.parent && isDate(selfRef.parent.signup_until)) {
          const dayAfter = addDays(value, 1);
          return Yup.date()
            .required(t('Required'))
            .min(dayAfter, t('MustBeAfterSignupFrom'));
        }
        return schema;
      }),
  }),
});

export const getModuleFormValidation = (t: i18n.TFunction) => ({
  initialValues: {},
  schema: Yup.object().shape({
    name: Yup.string().required(t('Required')),
    section: Yup.string()
      .matches(RegExp(/^[A-Z]{1}$/), t('Required'))
      .required(t('Required')),
    schedule_id: Yup.string().required(t('Required')),
    instructor_id: Yup.string().required(t('Required')),
    assistant_id: Yup.string().required(t('Required')),
    clan: Yup.number().when('name', (value: string) => {
      if (value === 'M-0') {
        return Yup.string().required(t('Required'));
      }
      return Yup.string();
    }),
  }),
});

export const getModuleUpdateValidation = (t: i18n.TFunction) => ({
  initialValues: {},
  schema: Yup.object().shape({
    name: Yup.string().required(t('Required')),
    schedule_id: Yup.string().required(t('Required')),
    instructor_id: Yup.string().required(t('Required')),
    assistant_id: Yup.string().required(t('Required')),
    clan: Yup.number().when('name', (value: string) => {
      if (value === 'M-0') {
        return Yup.string().required(t('Required'));
      }
      return Yup.string();
    }),
  }),
});

// export const scheduleFormValidation = t =>
//   Yup.object().shape({
//     day: Yup.string()
//       .oneOf(days, t('InvalidDay'))
//       .required(t('Required')),
//     from: Yup.string().required(t('Required')),
//     until: Yup.string()
//       .when('from', (fromValue, _) =>
//         Yup.string().test('is-after-start-time', t('MustBeAfterStartTime'), untilValue =>
//           moment(untilValue, 'hh:mm').isAfter(moment(fromValue, 'hh:mm')),
//         ),
//       )
//       .required(t('Required')),
//   });
