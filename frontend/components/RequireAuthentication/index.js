import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { notification } from 'antd';
import { AuthContextConsumer } from '../../context/AuthContext';

class RequireAuthentication extends Component {
  componentDidMount() {
    this.redirectIfNotAuth();
  }

  redirectIfNotAuth = () => {
    const { t, isAuth } = this.props;

    if (!isAuth) {
      notification.error({
        message: t('Unauthorized'),
        description: t('LoginFirst'),
      });

      Router.push('/login');
    }
  };

  render() {
    const { children } = this.props;

    return (
      <AuthContextConsumer>
        {context =>
          context.isAuth &&
          children({
            ...context,
          })
        }
      </AuthContextConsumer>
    );
  }
}

RequireAuthentication.propTypes = {
  children: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
};

export default RequireAuthentication;
