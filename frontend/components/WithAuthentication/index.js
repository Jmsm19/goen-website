/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import NProgress from 'nprogress';
import Router from 'next/router';
import { notification } from 'antd';
import { SendData } from '../../utils/fetch';
import { i18n } from '../../i18n';


class WithAuthentication extends Component {
  state = {
    registerSuccess: false,
    message: '',
    fieldErrors: []
  }

  handlePasswordConfirmation = ({password, password_confirmation}) => {
    const bothPasswordHaveContent = password.length > 0 && password_confirmation.length > 0;

    if (bothPasswordHaveContent && password !== password_confirmation) {
      return {
        password_confirmation: i18n.t('common:PasswordNotEqual')
      }
    }
    return {};
  }

  handleLogin = (values, { setSubmitting }) => {
    NProgress.start();
    SendData('POST', '/auth/login', values)
      .then(data => data.json())
      .then(({access_token, message}) => {
        if (message) {
          throw Error(message)
        } else {
          NProgress.done();
          Cookies.set('token', access_token);
          setSubmitting(false);
          Router.push('/authenticated')
        }
      })
      .catch(error => {
        NProgress.done();
        setSubmitting(false);
        notification.error({
          message: 'Error',
          description: error.message,
        });
      });
  }

  handleRegister = (values, { setSubmitting }) => {
    NProgress.start();
    SendData('POST', '/auth/signup', values)
      .then(data => data.json())
      .then((data) => {
        if (data.errors) {
          throw data;
        } else {
          NProgress.done();
          this.setState(() => ({
            registerSuccess: true,
            message: data.message
          }), () => {
            setSubmitting(false);
          })
        }
      })
      .catch(({_, errors}) => {
        NProgress.done();
        setSubmitting(false);

        let description = '';
        let fields = [];

        if (errors) {
          description = Object.values(errors).join(' ');
          fields = Object.keys(errors);
        }

        this.setState(() => ({
          fieldErrors: fields
        }), () => {
          notification.error({
            message: 'Error',
            description,
          });
        })

      });
  }

  render() {
    const { children } = this.props;
    const { registerSuccess, message, fieldErrors } = this.state;

    if (registerSuccess) {
      return (
        <>
          <h2>{ message }</h2>
          <p>{i18n.t('common:CheckConfirmationEmail')}</p>
        </>
      )
    }

    return children({
      fieldErrors,
      handleLogin: this.handleLogin,
      handleRegister: this.handleRegister,
      handlePasswordConfirmation: this.handlePasswordConfirmation,
    });
  }
}

WithAuthentication.propTypes = {
  children: PropTypes.func.isRequired,
}

export default WithAuthentication;
