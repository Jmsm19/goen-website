import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Table, Icon, Button, Modal } from 'antd';
import TableFilterForm from '../TableFilterForm';

class InstructorsTable extends Component {
  componentDidMount() {
    const { instructors, getInstructors } = this.props;
    if (instructors.length === 0 && getInstructors) {
      getInstructors();
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

  toggleModal = onOk => {
    const { t } = this.props;
    Modal.confirm({
      title: t('ConfirmInstructorRemoval'),
      okText: t('Yes'),
      onOk,
      cancelText: t('No'),
    });
  };

  render() {
    const { t, instructors, loading, removeRole } = this.props;
    const data = [];

    const columns = [
      {
        title: t('Name'),
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
      },
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

    if (instructors.length > 0) {
      instructors.map(user =>
        data.push({
          key: uuid(),
          name: user.name,
          actions: {
            name: <Icon type='delete' />,
            btnType: 'dashed',
            event: () => this.toggleModal(() => removeRole(user.id, 'instructor')),
          },
        }),
      );
    }

    return (
      <Table
        showHeader={false}
        scroll={{ y: '50vh' }}
        pagination={false}
        loading={loading}
        columns={columns}
        dataSource={data}
        locale={{
          emptyText: t('NoInstructors'),
        }}
      />
    );
  }
}

InstructorsTable.defaultProps = {
  instructors: [],
  loading: false,
  getInstructors: () => null,
  addRole: () => null,
  removeRole: () => null,
};

InstructorsTable.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  getInstructors: PropTypes.func,
  addRole: PropTypes.func,
  removeRole: PropTypes.func,
  instructors: PropTypes.arrayOf(PropTypes.shape()),
};

export default InstructorsTable;
