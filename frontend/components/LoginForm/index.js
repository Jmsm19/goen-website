/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import WithAuthentication from '../WithAuthentication';
import { validateEmail } from '../../utils/formValidation';

const LoginForm = ({ t }) => (
  <WithAuthentication>
    {({ handleLogin }) => (
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={handleLogin}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="login_email">
                {t('Email')}
                <Field type="email" name="email"
                  autoComplete="username" id="login_email" validate={validateEmail} />
              </label>
              <ErrorMessage className="error_field" name="email" component="div" />
            </div>
            <div>
              <label htmlFor="login_password">
                {t('Password')}
                <Field type="password" name="password"
                  autoComplete="current-password" id="login_password" />
              </label>
              <ErrorMessage className="error_field" name="password" component="div" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {t('Login')}
            </button>
          </Form>
        )}
      </Formik>
    )}
  </WithAuthentication>
)

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
}

export default LoginForm

