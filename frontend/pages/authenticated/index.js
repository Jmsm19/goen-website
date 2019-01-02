import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { withNamespaces } from '../../i18n';
import RequireAuthentication from '../../components/RequireAuthentication';

export class Authenticated extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common']
    }
  }

  render() {
    const { t, isAuth } = this.props;

    return (
      <RequireAuthentication t={t} isAuth={isAuth}>
        {() => (
          isAuth && (
            <>
              <Alert
                type="success"
                message={t('You are logged in... Sort of.')}
                description={t('Page under construction ')}
              />
            </>
          )
        )}
      </RequireAuthentication>
    )
  }
}

Authenticated.propTypes = {
  t: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired,
}


export default withNamespaces('common')(Authenticated);