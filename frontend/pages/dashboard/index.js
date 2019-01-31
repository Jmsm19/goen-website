import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import RequireAuthentication from '../../components/RequireAuthentication';
import { withNamespaces } from '../../i18n';
import { Loading } from '../../components/Loading';

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
        {({ authUser }) => {
          const userStatus = authUser.registrationStatus;

          if (userStatus !== 'registered' && authUser.isStudent) {
            Router.push('/dashboard/student/registration');
            return <Loading />;
          }

          if (authUser.isAdmin) {
            Router.push('/dashboard/admin/period');
            return <Loading />;
          }

          return (
            <div>
              <h1>DashboardIndexPage</h1>
            </div>
          );
        }}
      </RequireAuthentication>
    );
  }
}

DashboardIndexPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(DashboardIndexPage);
