import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RequireRole from '../../../../components/RequireRole';
import { withNamespaces } from '../../../../i18n';
import InstructorAssignmentCard from '../../../../components/InstructorAssignmentCard';

class InstructorsPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  render() {
    const { t } = this.props;
    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => <InstructorAssignmentCard t={t} />}
      </RequireRole>
    );
  }
}

InstructorsPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(InstructorsPage);
