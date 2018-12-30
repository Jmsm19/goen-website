/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import WithAuthentication from '../WithAuthentication';
import { validateEmail,
  validatePassword,
  validateTextField,
  validateBirthDateField
} from '../../utils/formValidation';

const RegisterForm = ({ t }) => {
  const initialState = {
    name: '',
    birth_date: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  return (
    <WithAuthentication>
      {({handlePasswordConfirmation, handleRegister}) => (
        <Formik
          initialValues={initialState}
          validate={handlePasswordConfirmation}
          onSubmit={handleRegister}>
          {({ isSubmitting }) => (
            <Form>
              {/* Name */}
              <div>
                <label htmlFor="register_name">
                  {t('Name')}
                  <Field type="text" name="name"
                    id="register_name" validate={validateTextField} />
                </label>
                <ErrorMessage className="error_field" name="name" component="div" />
              </div>
              {/* Birth date */}
              <div>
                <label htmlFor="register_birth_date">
                  {t('BirthDate')}
                  <Field type="date" name="birth_date"
                    id="register_birth_date" validate={validateBirthDateField} />
                </label>
                <ErrorMessage className="error_field" name="birth_date" component="div" />
              </div>
              {/* Phone number */}
              <div>
                <label htmlFor="register_phone_number">
                  {t('PhoneNumber')}
                  <Field type="tel" name="phone_number"
                    id="register_phone_number" validate={validateTextField} placeholder="0424-1234567" />
                </label>
                <ErrorMessage className="error_field" name="phone_number" component="div" />
              </div>
              {/* Email */}
              <div>
                <label htmlFor="register_email">
                  {t('Email')}
                  <Field type="email" name="email"
                    autoComplete="username" id="register_email" validate={validateEmail} />
                </label>
                <ErrorMessage className="error_field" name="email" component="div" />
              </div>
              {/* Password */}
              <div>
                <label htmlFor="register_password">
                  {t('Password')}
                  <Field type="password" name="password"
                    validate={validatePassword}
                    autoComplete="new-password" id="register_password" />
                </label>
                <ErrorMessage className="error_field" name="password" component="div" />
              </div>
              {/* Password confirmation */}
              <div>
                <label htmlFor="register_password_confirmation">
                  {t('PasswordConfirmation')}
                  <Field type="password" name="password_confirmation"
                    validate={validatePassword}
                    autoComplete="new-password" id="register_password_confirmation" />
                </label>
                <ErrorMessage className="error_field"
                  name="password_confirmation" component="div" />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {t('Register')}
              </button>
            </Form>
          )}
        </Formik>
      )}
    </WithAuthentication>
  )
}

RegisterForm.propTypes = {
  t: PropTypes.func.isRequired,
}

export default RegisterForm;