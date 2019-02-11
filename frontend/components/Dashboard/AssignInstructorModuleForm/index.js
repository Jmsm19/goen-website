import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InstitutionContextConsumer } from '../../../context/InstitutionContext';
import ModulesTable from '../../ModulesTable';

class AssignInstructorModuleForm extends Component {
  state = {};

  render() {
    const { t } = this.props;

    return (
      <InstitutionContextConsumer>
        {({ currentPeriod }) => <ModulesTable t={t} modules={currentPeriod.modules} />}
      </InstitutionContextConsumer>
    );
  }
}

AssignInstructorModuleForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default AssignInstructorModuleForm;
