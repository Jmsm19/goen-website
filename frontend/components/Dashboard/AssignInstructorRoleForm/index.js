import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersTable from '../UsersTable';
import { UsersContextConsumer } from '../../../context/UsersContext';

class AssignInstructorRoleForm extends Component {
  state = {};

  render() {
    const { t } = this.props;

    return (
      <UsersContextConsumer>
        {({ users, getAllUsers, gettingUsers, addRole, removeRole }) => (
          <UsersTable
            t={t}
            users={users}
            getUsers={getAllUsers}
            loading={gettingUsers}
            addRole={addRole}
            removeRole={removeRole}
          />
        )}
      </UsersContextConsumer>
    );
  }
}

AssignInstructorRoleForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default AssignInstructorRoleForm;
