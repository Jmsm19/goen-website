import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import SignupForm from '../../components/SignupForm';
import { AuthContextConsumer } from '../../context/AuthContext';
import { withNamespaces } from '../../i18n';
import { StyledPage } from '../../styles/pages/SignupPage';

export class SignupPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  componentDidMount() {
    const { isAuth } = this.props;
    if (isAuth) {
      Router.push('/dashboard');
    }
  }

  render() {
    const { t } = this.props;

    return (
      <StyledPage>
        <AuthContextConsumer>
          {({ isAuth, handleRegister, fieldErrors, registerSuccess, message }) => {
            if (!isAuth) {
              if (registerSuccess) {
                return (
                  <>
                    <h2>{message}</h2>
                    <p>{t('common:CheckConfirmationEmail')}</p>
                  </>
                );
              }

              return (
                <SignupForm
                  {...this.props}
                  handleRegister={handleRegister}
                  fieldErrors={fieldErrors}
                />
              );
            }
            return null;
          }}
        </AuthContextConsumer>
      </StyledPage>
    );
  }
}

SignupPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(SignupPage);
