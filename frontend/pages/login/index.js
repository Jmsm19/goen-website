import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from '../../i18n';
import { AuthContextConsumer } from '../../context/AuthContext';
import LoginForm from '../../components/Forms/LoginForm';
import { StyledLogo, StyledPage } from '../../styles/pages/LoginPage';

export class LoginPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  render() {
    return (
      <StyledPage>
        <AuthContextConsumer>
          {({ handleLogin, isAuth }) =>
            !isAuth && (
              <div className='page'>
                <StyledLogo src='/static/images/goen-logo-small-trans.png' alt='GOEN Maracaibo' />
                <LoginForm {...this.props} handleLogin={handleLogin} />
              </div>
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
