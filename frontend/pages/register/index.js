import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import RegisterForm from '../../components/RegisterForm';
import { AuthContextConsumer } from '../../context/AuthContext';
import { withNamespaces } from '../../i18n';
import { StyledPage } from '../../styles/pages/RegisterPage';

export class RegisterPage extends Component {
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
                <RegisterForm
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

RegisterPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(RegisterPage);
