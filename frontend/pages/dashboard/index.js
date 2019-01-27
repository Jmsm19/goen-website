import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RequireAuthentication from '../../components/RequireAuthentication';
import { withNamespaces } from '../../i18n';

class DashboardIndexPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  render() {
    const { t } = this.props;
    return (
      <RequireAuthentication t={t}>
        {() => (
          <div>
            <h1>DashboardIndexPage</h1>
          </div>
        )}
      </RequireAuthentication>
    );
  }
}

DashboardIndexPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(DashboardIndexPage);
