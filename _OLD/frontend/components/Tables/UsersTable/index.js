import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Table, Icon, Tag, Button } from 'antd';
import TableFilterForm from '../../Forms/TableFilterForm';

class UsersTable extends Component {
  componentDidMount() {
    const { users, getUsers } = this.props;
    if (users.length === 0 && getUsers) {
      getUsers();
    }
  }

  handleSearch = confirm => {
    confirm();
  };

  getColumnSearchProps = dataIndex => {
    const { t } = this.props;
    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <TableFilterForm
          t={t}
          handleSearch={this.handleSearch}
          setSelectedKeys={setSelectedKeys}
          selectedKeys={selectedKeys}
          confirm={confirm}
          clearFilters={clearFilters}
        />
      ),
      filterIcon: filtered =>
        filtered ? (
          <Icon type='filter' style={{ color: 'var(--light-primary-color)' }} />
        ) : (
          <Icon type='search' />
        ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => TableFilterForm.searchInput && TableFilterForm.searchInput.select());
        }
      },
    };
  };

  getRelevantAction = user => {
    const { t, addRole, removeRole } = this.props;

    if (!user.isInstructor) {
      return {
        name: t('MakeInstructor'),
        btnType: 'default',
        event: () => addRole(user.id, 'instructor'),
      };
    }

    return {
      name: t('RemoveAsInstructor'),
      btnType: 'dashed',
      event: () => removeRole(user.id, 'instructor'),
    };
  };

  render() {
    const { t, users, loading, showRoles } = this.props;
    const data = [];

    const columns = [
      {
        title: t('Name'),
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
      {
        title: t('NationalId'),
        dataIndex: 'national-id',
        key: 'national-id',
        ...this.getColumnSearchProps('national-id'),
      },
      ...(showRoles
        ? [
            {
              title: t('Roles'),
              dataIndex: 'roles',
              key: 'roles',
              render: roles =>
                roles &&
                roles.map(
                  role =>
                    !!role && (
                      <Tag key={uuid()} color={role.color}>
                        {role.name}
                      </Tag>
                    ),
                ),
            },
          ]
        : []),
      {
        title: '',
        dataIndex: 'actions',
        key: 'actions',
        width: 100,
        render: ({ name, event, btnType, ...rest }) => (
          <Button type={btnType} onClick={event} {...rest}>
            {name}
          </Button>
        ),
      },
    ];

    if (users.length > 0) {
      users.map(user =>
        data.push({
          key: uuid(),
          name: user.name,
          'national-id': user.nationalId,
          actions: this.getRelevantAction(user),
          roles: [
            user.isAdmin && {
              name: t('Admin'),
              color: 'red',
            },
            user.isInstructor && {
              name: t('Instructor'),
              color: 'purple',
            },
            user.isAssistant && {
              name: t('Assistant'),
              color: 'volcano',
            },
            user.isStudent && {
              name: t('Student'),
              color: 'geekblue',
            },
          ],
        }),
      );
    }

    return (
      <Table
        useFixedHeader
        pagination={false}
        scroll={{ y: '50vh' }}
        loading={loading}
        columns={columns}
        dataSource={data}
        locale={{
          emptyText: t('NoUsers'),
        }}
      />
    );
  }
}

UsersTable.defaultProps = {
  users: [],
  loading: false,
  showRoles: true,
  getUsers: () => null,
  addRole: () => null,
  removeRole: () => null,
};

UsersTable.propTypes = {
  t: PropTypes.func.isRequired,
  showRoles: PropTypes.bool,
  loading: PropTypes.bool,
  getUsers: PropTypes.func,
  addRole: PropTypes.func,
  removeRole: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.shape()),
};

export default UsersTable;
