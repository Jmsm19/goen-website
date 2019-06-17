import i18n from 'i18next';
import { subYears, format, isAfter } from 'date-fns';

const isEmail = (string: string) =>
  RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ).test(string);

export const LoginFormSetup = {
  initialValues: {
    email: '',
    password: '',
  },
  validate: (values: LoginFormValues, t: i18n.TFunction) => {
    const errors: FormErrors = {};

    if (!values.email) {
      errors.email = t('Required');
    } else if (!isEmail(values.email)) {
      errors.email = t('InvalidEmail');
    }

    if (!values.password) {
      errors.password = t('Required');
    }

    return errors;
  },
};

export const RegisterFormSetup = {
  initialValues: {
    name: '',
    nationalId: '',
    birthDate: undefined,
    phoneNumber: '',
    email: '',
    password: '',
    password_confirmation: '',
    roleName: 'student',
  },
  validate: (values: RegisterFormValues, t: i18n.TFunction) => {
    const PASSWORD_MIN_LENGTH = 6;
    const MINIMUM_AGE = 14;
    const MINIMUM_DATE = format(subYears(new Date(), MINIMUM_AGE), 'YYYY-MM-DD');

    const errors: FormErrors = {};

    if (!values.name) {
      errors.name = t('Required');
    }

    if (!values.nationalId) {
      errors.nationalId = t('Required');
    } else if (!RegExp(/^[0-9]{7,}$/i).test(values.nationalId)) {
      errors.nationalId = t('WrongNationalIdFormat');
    }

    if (!values.birthDate) {
      errors.birthDate = t('Required');
    } else if (isAfter(values.birthDate, MINIMUM_DATE)) {
      errors.birthDate = t('Underage', { age: MINIMUM_AGE });
    }

    if (!values.phoneNumber) {
      errors.phoneNumber = t('Required');
    } else if (!RegExp(/^[0-9]{4}-[0-9]{7}$/i).test(values.phoneNumber)) {
      errors.phoneNumber = t('WrongPhoneFormat');
    }

    if (!values.email) {
      errors.email = t('Required');
    } else if (!isEmail(values.email)) {
      errors.email = t('InvalidEmail');
    }

    if (!values.password) {
      errors.password = t('Required');
    } else if (values.password.length < PASSWORD_MIN_LENGTH) {
      errors.password = t('TooShort', { minimum: PASSWORD_MIN_LENGTH });
    }

    if (!values.password_confirmation) {
      errors.password_confirmation = t('Required');
    } else if (values.password_confirmation.length < PASSWORD_MIN_LENGTH) {
      errors.password_confirmation = t('TooShort', { minimum: PASSWORD_MIN_LENGTH });
    } else if (!!values.password && values.password_confirmation !== values.password) {
      errors.password_confirmation = t('PasswordNotEqual');
    }

    if (!values.roleName) {
      errors.roleName = t('Required');
    }

    return errors;
  },
};
