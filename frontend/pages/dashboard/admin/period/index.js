import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RequireRole from '../../../../components/RequireRole';
import { withNamespaces } from '../../../../i18n';

class PeriodPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  render() {
    const { t } = this.props;
    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <div>
            <h1>PeriodPage</h1>
          </div>
        )}
      </RequireRole>
    );
  }
}

PeriodPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(PeriodPage);
