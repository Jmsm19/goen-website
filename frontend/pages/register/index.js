import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../../components/RegisterForm';
import { AuthContextConsumer } from '../../context/AuthContext';
import { withNamespaces } from '../../i18n';

export class RegisterPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  render() {
    const { t } = this.props;

    return (
      <div className="registerPage" style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto'
      }}>
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
      </div>
    )
  }
}

RegisterPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(RegisterPage);