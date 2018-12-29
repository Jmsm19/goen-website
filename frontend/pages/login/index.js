/* eslint-disable jsx-a11y/label-has-for */
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { withNamespaces } from '../../i18n';
import { validateEmail } from '../../utils/formValidation';
import { SendData } from '../../utils/fetch';

export class LoginPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  handleSubmit = (values, { setSubmitting }) => {
    NProgress.start();
    SendData('POST', '/auth/login', values)
      .then(data => data.json())
      // eslint-disable-next-line camelcase
      .then(({access_token}) => {
        NProgress.done();
        Cookies.set('token', access_token);
        setSubmitting(false);
        Router.push('/authenticated')
      })
      .catch(error => {
        NProgress.done();
        setSubmitting(false);
        console.error(error);
      });
  }

  render() {
    const { t } = this.props;

    return (
      <div className="loginPage">
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={this.handleSubmit}>
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
      </div>
    )
  }
}

LoginPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(LoginPage);