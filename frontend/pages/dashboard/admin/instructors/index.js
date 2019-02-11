import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
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
        {() => (
          <>
            <Button style={{ marginBottom: '20px' }} type='primary'>
              {t('RegisterInstructor')}
            </Button>
            <InstructorAssignmentCard t={t} />
          </>
        )}
      </RequireRole>
    );
  }
}

InstructorsPage.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(InstructorsPage);
