import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RequireRole from '../../../../components/RequireRole';
import { withNamespaces } from '../../../../i18n';

class ModulesPage extends Component {
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
            <h1>ModulesPage</h1>
          </div>
        )}
      </RequireRole>
    );
  }
}

ModulesPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(ModulesPage);
