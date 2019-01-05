import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../../components/RegisterForm';
import { AuthContextConsumer } from '../../context/AuthContext';
import { withNamespaces } from '../../i18n';
import { StyledPage } from '../../styles/pages/RegisterPage';

export class RegisterPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  render() {
    const { t } = this.props;

    return (
      <StyledPage>
        <AuthContextConsumer>
          {({handleRegister, fieldErrors, registerSuccess, message}) => {
            if (registerSuccess) {
              return (
                <>
                  <h2>{ message }</h2>
                  <p>{t('common:CheckConfirmationEmail')}</p>
                </>
              )
            }

            return (
              <RegisterForm
                {...this.props}
                handleRegister={handleRegister}
                fieldErrors={fieldErrors} />
            )
          }}
        </AuthContextConsumer>
      </StyledPage>
    )
  }
}

RegisterPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(RegisterPage);