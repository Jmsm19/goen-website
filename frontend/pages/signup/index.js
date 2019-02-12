import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SignupForm from '../../components/Forms/SignupForm';
import { AuthContextConsumer } from '../../context/AuthContext';
import ProtectedView from '../../components/ProtectedView';
import { StyledPage } from '../../styles/pages/SignupPage';
import { GlobalSettingsConsumer } from '../../context/GlobalSettingsContext';
import { withNamespaces } from '../../i18n';

export class SignupPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  render() {
    const { t } = this.props;

    return (
      <GlobalSettingsConsumer>
        {({ settings }) => (
          <ProtectedView t={t} conditions={[settings.userSignupActive]}>
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
          </ProtectedView>
        )}
      </GlobalSettingsConsumer>
    );
  }
}

SignupPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(SignupPage);
