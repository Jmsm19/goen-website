import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InstructorsContextConsumer } from '../../../context/InstructorsContext';
import InstructorsTable from '../../InstructorsTable';

class AssignInstructorRole extends Component {
  state = {};

  render() {
    const { t } = this.props;

    return (
      <InstructorsContextConsumer>
        {({ instructors, getAllInstructors, loading, removeRole }) => (
          <InstructorsTable
            t={t}
            instructors={instructors}
            getInstructors={getAllInstructors}
            loading={loading}
            removeRole={removeRole}
          />
        )}
      </InstructorsContextConsumer>
    );
  }
}

AssignInstructorRole.propTypes = {
  t: PropTypes.func.isRequired,
};

export default AssignInstructorRole;
