import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';
import RequireRole from '../../../../components/RequireRole';
import { withNamespaces } from '../../../../i18n';
import AssignInstructorModuleForm from '../../../../components/Dashboard/AssignInstructorModuleForm';

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
          <Card bodyStyle={{ padding: 0 }}>
            <AssignInstructorModuleForm t={t} />
          </Card>
        )}
      </RequireRole>
    );
  }
}

ModulesPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(ModulesPage);
