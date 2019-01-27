/* eslint-disable react/sort-comp */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import UniversalCookies from 'universal-cookie';
import NProgress from 'nprogress';
import Router from 'next/router';
import getConfig from 'next/config';
import { notification } from 'antd';
import { GetData, SendData } from '../utils/fetch';
import { Loading } from '../components/Loading';

const { publicRuntimeConfig } = getConfig();
const AuthContext = createContext({});

class AuthContextProvider extends Component {
  componentDidMount() {
    const Cookies = new UniversalCookies();
    if (Cookies.get('token') && Cookies.get('token') !== 'undefiend') {
      this.getAuthUser();
    } else {
      this.setState({
        mounted: true,
      });
    }
  }

  getAuthUser = () => {
    NProgress.start();
    GetData('/auth/user')
      .then(response => response.json())
      .then(({ data, message }) => {
        NProgress.done();
        if (message) {
          throw Error(message);
        } else {
          NProgress.done();
          this.setState(prevState => ({
            authUser: data,
            isAuth: !prevState.isAuth ? true : prevState.isAuth,
            mounted: prevState.mounted ? true : !prevState.mounted,
          }));
        }
      })
      .catch(error => {
        NProgress.done();
        this.setState(
          prevState => ({
            authUser: null,
            isAuth: false,
            mounted: prevState.mounted ? true : !prevState.mounted,
          }),
          () => {
            notification.error({
              message: 'Error',
              description: error.message,
            });
            Router.push('/login');
          },
        );
      });
  };

  updateAuthUser = (values, { setSubmitting }) => {
    const {
      authUser: { id },
    } = this.state;

    NProgress.start();
    SendData('PUT', `/user/${id}`, values)
      .then(response => response.json())
      .then(({ data, error }) => {
        NProgress.done();
        if (error) {
          throw Error(error);
        } else {
          NProgress.done();
          this.setState(
            () => ({
              authUser: data,
            }),
            () => {
              setSubmitting(false);
              notification.success({
                message: 'Usuario actualizado',
              });
            },
          );
        }
      })
      .catch(({ message, error }) => {
        NProgress.done();
        notification.error({
          message: 'Error',
          description: message || error,
        });
        setSubmitting(false);
      });
  };

  handleLogin = (values, { setSubmitting }) => {
    NProgress.start();
    const Cookies = new UniversalCookies();
    SendData('POST', '/auth/login', values)
      .then(data => data.json())
      .then(({ accessToken, expiresAt, message }) => {
        if (message) {
          throw Error(message);
        } else {
          NProgress.done();
          Cookies.set('token', accessToken, {
            secure: publicRuntimeConfig.NODE_ENV !== 'development',
            maxAge: expiresAt,
          });
          setSubmitting(false);
          this.setState(
            () => ({
              isAuth: true,
              mounted: false,
            }),
            () => {
              this.getAuthUser();
              Router.push('/dashboard/');
            },
          );
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
  };

  handleLogout = () => {
    NProgress.start();
    const Cookies = new UniversalCookies();
    GetData('/auth/logout')
      .then(data => data.json())
      .then(({ message }) => {
        NProgress.done();
        Cookies.remove('token');
        this.setState(
          {
            isAuth: false,
            authUser: null,
            message,
          },
          () => {
            Router.push('/');
          },
        );
      })
      .catch(error => {
        NProgress.done();
        notification.error({
          message: 'Error',
          description: error.message,
        });
      });
  };

  handleRegister = (values, { setSubmitting }) => {
    NProgress.start();
    SendData('POST', '/auth/signup', values)
      .then(data => data.json())
      .then(data => {
        if (data.errors) {
          throw data;
        } else {
          NProgress.done();
          this.setState(
            () => ({
              registerSuccess: true,
              message: data.message,
            }),
            () => {
              setSubmitting(false);
            },
          );
        }
      })
      .catch(({ _, errors }) => {
        NProgress.done();
        setSubmitting(false);

        let description = '';
        let fields = [];

        if (errors) {
          description = Object.values(errors).join(' ');
          fields = Object.keys(errors);
        }

        this.setState(
          () => ({
            fieldErrors: fields,
          }),
          () => {
            notification.error({
              message: 'Error',
              description,
            });
          },
        );
      });
  };

  setRegistrationStatus = status => {
    this.setState(prevState => ({
      ...prevState,
      authUser: {
        ...prevState.authUser,
        registrationStatus: status,
      },
    }));
  };

  state = {
    mounted: false,
    isAuth: false,
    handleLogin: this.handleLogin,
    handleLogout: this.handleLogout,
    handleRegister: this.handleRegister,
    handleUserUpdate: this.updateAuthUser,
    registerSuccess: false,
    setRegistrationStatus: this.setRegistrationStatus,
    message: '',
    fieldErrors: [],
    authUser: null,
  };

  render() {
    const { children } = this.props;
    const { mounted, ...state } = this.state;

    return mounted ? (
      <AuthContext.Provider value={{ ...state }}>{children}</AuthContext.Provider>
    ) : (
      <Loading />
    );
  }
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const AuthContextConsumer = AuthContext.Consumer;

export { AuthContext, AuthContextProvider, AuthContextConsumer };
