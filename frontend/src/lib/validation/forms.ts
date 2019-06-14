/* eslint-disable import/prefer-default-export */
import * as Yup from 'yup';
import { addDays, subYears, isDate, format } from 'date-fns';
// import { days } from '../config/constants';

export const getLoginValidationProps = t => ({
  initialValues: {
    email: '',
    password: '',
  },
  schema: Yup.object().shape({
    email: Yup.string()
      .email(t('InvalidEmail'))
      .required(t('Required')),
    password: Yup.string().required(t('Required')),
  }),
});

export const getSignupValidationProps = t => {
  const PASSWORD_MIN_LENGTH = 6;
  const MINIMUM_AGE = 14;
  const MINIMUM_DATE = format(subYears(new Date(), MINIMUM_AGE), 'YYYY-MM-DD');

  const initialValues = {
    name: '',
    nationalId: '',
    birthDate: undefined,
    phoneNumber: '',
    email: '',
    password: '',
    password_confirmation: '',
    roleName: 'student',
  };

  return {
    initialValues,
    schema: Yup.object().shape({
      name: Yup.string().required(t('Required')),
      nationalId: Yup.string()
        .required(t('Required'))
        .matches(/^[0-9]{7,}$/i, { message: t('WrongNationalIdFormat') }),
      phoneNumber: Yup.string()
        .required(t('Required'))
        .matches(/^[0-9]{4}-[0-9]{7}$/i, { message: t('WrongPhoneFormat') }),
      birthDate: Yup.date()
        .required(t('Required'))
        .max(MINIMUM_DATE, t('Underage', { age: MINIMUM_AGE })),
      email: Yup.string()
        .email(t('InvalidEmail'))
        .required(t('Required')),
      password: Yup.string()
        .required(t('Required'))
        .min(PASSWORD_MIN_LENGTH, t('TooShort', { minimum: PASSWORD_MIN_LENGTH })),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], t('PasswordNotEqual'))
        .required(t('Required')),
      roleName: Yup.string().default(initialValues.roleName),
    }),
  };
};

export const getPeriodFormValidation = t => ({
  initialValues: {},
  schema: Yup.object().shape({
    signup_from: Yup.string().required(t('Required')),
    signup_until: Yup.date()
      .required(t('Required'))
      .when('signup_from', (value, schema, selfRef) => {
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

export const getPeriodUpdateValidation = t => ({
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
      .when('signup_from', (value, schema, selfRef) => {
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

export const getModuleFormValidation = t => ({
  initialValues: {},
  schema: Yup.object().shape({
    name: Yup.string().required(t('Required')),
    section: Yup.string()
      .matches(RegExp(/^[A-Z]{1}$/), t('Required'))
      .required(t('Required')),
    schedule_id: Yup.string().required(t('Required')),
    instructor_id: Yup.string().required(t('Required')),
    assistant_id: Yup.string().required(t('Required')),
    clan: Yup.number().when('name', (value, _) => {
      if (value === 'M-0') {
        return Yup.string().required(t('Required'));
      }
      return Yup.string();
    }),
  }),
});

export const getModuleUpdateValidation = t => ({
  initialValues: {},
  schema: Yup.object().shape({
    name: Yup.string().required(t('Required')),
    schedule_id: Yup.string().required(t('Required')),
    instructor_id: Yup.string().required(t('Required')),
    assistant_id: Yup.string().required(t('Required')),
    clan: Yup.number().when('name', (value, _) => {
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
