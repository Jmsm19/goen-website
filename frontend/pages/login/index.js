import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from '../../i18n';
import LoginForm from '../../components/LoginForm';

export class LoginPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  render() {
    return (
      <div className="loginPage" style={{
        maxWidth: '900px',
        width: '100%',
        margin: '0 auto'
      }}>
        <LoginForm {...this.props }/>
      </div>
    )
  }
}

LoginPage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withNamespaces('common')(LoginPage);