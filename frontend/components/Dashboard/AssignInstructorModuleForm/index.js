import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AssignInstructorModuleForm extends Component {
  state = {};

  render() {
    const { t } = this.props;

    return (
      <div>
        <h1>Assign Instructor to Module</h1>
      </div>
    );
  }
}

AssignInstructorModuleForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default AssignInstructorModuleForm;
