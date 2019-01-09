import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { withNamespaces } from '../../i18n';
import { AuthContextConsumer } from '../../context/AuthContext';
import LoginForm from '../../components/LoginForm';
import { StyledLogo, StyledPage } from '../../styles/pages/LoginPage';

export class LoginPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  componentDidMount() {
    const { isAuth } = this.props;
    if (isAuth) {
      Router.push('/profile');
    }
  }

  render() {
    return (
      <StyledPage>
        <AuthContextConsumer>
          {({ handleLogin, isAuth }) =>
            !isAuth && (
              <>
                <StyledLogo src='/static/images/goen-logo-small-trans.png' alt='GOEN Maracaibo' />
                <LoginForm {...this.props} handleLogin={handleLogin} />
              </>
            )
          }
        </AuthContextConsumer>
      </StyledPage>
    );
  }
}

LoginPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(LoginPage);
