import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Icon, Button } from 'antd';
import { StyledTable } from '../../styles/pages/GeneralStyles';

function StudentPaymentStatusTable({ t, students }) {
  const columns = [
    {
      title: t('Name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: actions =>
        actions.length > 0 && (
          <div className='actions-column'>
            {actions.map(({ type, icon, event }) => (
              <Button key={uuid()} type={type || 'primary'} onClick={event}>
                {icon && <Icon type={icon} />}
              </Button>
            ))}
          </div>
        ),
    },
  ];

  const createTableDataSource = () => {
    const data = [];
    students.map(({ name, registrationStatus, currentModule }) => {
      const actions = [];
      if (registrationStatus === 'verifying payment') {
        actions.push(
          {
            name: t('Confirm'),
            icon: 'check',
            event: () => console.log('Action 1'),
          },
          {
            name: t('NotReceived'),
            icon: 'close',
            type: 'dashed',
            event: () => console.log('Action 1'),
          },
        );
      }

      return data.push({
        key: uuid(),
        name: `${name}`,
        'registration-status': t(registrationStatus),
        action: actions,
      });
    });
    return data;
  };

  return (
    <StyledTable
      showHeader={false}
      pagination={false}
      columns={columns}
      dataSource={createTableDataSource()}
      locale={{
        emptyText: t('NoData'),
        filterReset: t('Reset'),
        filterConfirm: t('Ok'),
      }}
    />
  );
}

StudentPaymentStatusTable.propTypes = {
  t: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      registrationStatus: PropTypes.string,
    }),
  ).isRequired,
};

export default StudentPaymentStatusTable;
