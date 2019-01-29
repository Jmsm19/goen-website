import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Icon, Button, Modal, notification } from 'antd';
import { StyledTable } from '../../styles/pages/GeneralStyles';

function StudentPaymentStatusTable({
  t,
  students,
  confirmPayment,
  rejectPayment,
  loading,
  updateStudents,
  title,
}) {
  const showConfirm = (event, confirmText) => {
    Modal.confirm({
      title: confirmText,
      centered: true,
      okText: t('Yes'),
      okType: 'danger',
      cancelText: t('No'),
      onOk() {
        event();
      },
      onCancel() {},
    });
  };

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
            {actions.map(({ type, btnTitle, icon, event, confirmText }) => (
              <Button
                title={btnTitle}
                key={uuid()}
                type={type || 'primary'}
                onClick={() => showConfirm(event, confirmText)}
              >
                {icon && <Icon type={icon} />}
              </Button>
            ))}
          </div>
        ),
    },
  ];

  const createTableDataSource = () => {
    const data = [];
    students.forEach(({ id, name, registrationStatus }) => {
      const actions = [];
      if (registrationStatus === 'verifying payment') {
        actions.push(
          {
            name: t('Confirm'),
            btnTitle: t('Confirm'),
            icon: 'check',
            confirmText: t('ConfirmPaymentAcceptance'),
            event: () => {
              confirmPayment(id)
                .then(() => updateStudents())
                .catch(({ error, message }) => {
                  notification.error({
                    message: error || message,
                  });
                });
            },
          },
          {
            name: t('NotReceived'),
            btnTitle: t('NotReceived'),
            icon: 'close',
            type: 'dashed',
            confirmText: t('ConfirmPaymentRejection'),
            event: () =>
              rejectPayment(id)
                .then(() => updateStudents())
                .catch(({ error, message }) => {
                  notification.error({
                    message: error || message,
                  });
                }),
          },
        );
      }
      data.push({
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
      title={title ? () => title : null}
      showHeader={false}
      pagination={false}
      columns={columns}
      loading={loading}
      dataSource={createTableDataSource()}
      locale={{
        emptyText: t('NoData'),
        filterReset: t('Reset'),
        filterConfirm: t('Ok'),
      }}
    />
  );
}

StudentPaymentStatusTable.defaultProps = {
  confirmPayment: () => null,
  rejectPayment: () => null,
  updateStudents: () => null,
  loading: false,
  title: '',
};

StudentPaymentStatusTable.propTypes = {
  t: PropTypes.func.isRequired,
  title: PropTypes.string,
  loading: PropTypes.bool,
  updateStudents: PropTypes.func,
  confirmPayment: PropTypes.func,
  rejectPayment: PropTypes.func,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      registrationStatus: PropTypes.string,
    }),
  ).isRequired,
};

export default StudentPaymentStatusTable;
