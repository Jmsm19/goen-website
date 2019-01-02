/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import NProgress from 'nprogress';
import Router from 'next/router';
import { notification } from 'antd';
import { GetData, SendData } from '../utils/fetch';

const AuthContext = createContext({});

class AuthContextProvider extends Component {
  getAuthUser = () => {
    NProgress.start();
    GetData('/auth/user')
      .then(response => response.json())
      .then(({data, message}) => {
        NProgress.done();
        if (message) {
          throw Error(message)
        } else {
          NProgress.done();
          this.setState({
            authUser: data
          })
        }
      })
      .catch(error => {
        NProgress.done();
        notification.error({
          message: 'Error',
          description: error.message,
        });
      });
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
          this.setState(() => ({
            isAuth: true,
          }), () => {
            this.getAuthUser();
          })
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

  handleLogout = () => {
    NProgress.start();

    GetData('/auth/logout')
      .then(data => data.json())
      .then(({message}) => {
        NProgress.done();
        Router.push('/login');
        Cookies.remove('token');
        setTimeout(() => {
          this.setState({
            isAuth: false,
            authUser: null,
            message
          })
        }, 200)
      })
      .catch(error => {
        NProgress.done();
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

  state = {
    isAuth: false,
    handleLogin: this.handleLogin,
    handleLogout: this.handleLogout,
    handleRegister: this.handleRegister,
    registerSuccess: false,
    message: '',
    fieldErrors: [],
    authUser: null,
  };

  render() {
    const { children } = this.props;

    return (
      <AuthContext.Provider value={{...this.state}}>
        { children }
      </AuthContext.Provider>
    );
  }
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthContextConsumer = AuthContext.Consumer;

export { AuthContextProvider,  AuthContextConsumer};