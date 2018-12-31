import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RegisterForm from '../../components/RegisterForm';
import { withNamespaces } from '../../i18n';

export class RegisterPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  render() {
    return (
      <div className="registerPage" style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto'
      }}>
        <RegisterForm {...this.props} />
      </div>
    )
  }
}

RegisterPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(RegisterPage);