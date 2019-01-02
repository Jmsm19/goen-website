import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { withNamespaces } from '../../i18n';
import { AuthContextConsumer } from '../../context/AuthContext';
import LoginForm from '../../components/LoginForm';

export class LoginPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  componentDidMount() {
    const { isAuth } = this.props;
    if (isAuth) {
      Router.push('/profile');
    }
  }

  render() {
    return (
      <div className="loginPage" style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto'
      }}>
        <AuthContextConsumer>
          {({ handleLogin, isAuth }) => (
            !isAuth && (
              <LoginForm {...this.props } handleLogin={handleLogin} />
            )
          )}
        </AuthContextConsumer>
      </div>
    )
  }
}

LoginPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(LoginPage);