import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Card, Table, Button, Icon } from 'antd';
import { ServerGetData } from '../../utils/fetch';
import { withNamespaces } from '../../i18n';

class AdminDashboard extends Component {
  static async getInitialProps({ req }) {
    let periodData;

    try {
      const periodResponse = await ServerGetData('/period/current/students', req);
      const periodJson = await periodResponse.json();
      console.log(periodJson);
      periodData = periodJson.data;
    } catch (error) {
      console.log(error);
    }

    return {
      namespacesRequired: ['common'],
      periodData,
    };
  }

  render() {
    const { periodData, t } = this.props;
    const modules = periodData ? periodData.modules : [];
    const data = [];

    if (modules) {
      modules.map(module =>
        module.students.map(student => {
          const actions = [];

          if (student.registrationStatus === 'verifying payment') {
            actions.push(
              {
                name: t('Confirm'),
                icon: 'check',
                event: () => console.log('Action 1'),
              },
              {
                name: t('NotReceived'),
                type: 'dashed',
                event: () => console.log('Action 1'),
              },
            );
          }

          return data.push({
            key: uuid(),
            name: `${student.name}`,
            module: `${module.name} ${module.section}`,
            'registration-status': t(student.registrationStatus),
            action: actions,
          });
        }),
      );
    }

    const columns = [
      {
        title: t('Name'),
        dataIndex: 'name',
        key: 'name',
        width: 200,
      },
      {
        title: t('Module'),
        dataIndex: 'module',
        key: 'module',
        width: 100,
      },
      {
        title: t('RegistrationStatus'),
        dataIndex: 'registration-status',
        key: 'registration-status',
      },
      {
        dataIndex: 'action',
        key: 'action',
        render: actions =>
          actions.length > 0 &&
          actions.map(({ type, icon, event, name }) => (
            <Button key={uuid()} type={type || 'primary'} onClick={event}>
              {icon && <Icon type={icon} />}
              {name}
            </Button>
          )),
      },
    ];

    return (
      <div>
        <Card
          style={{ marginTop: '10px', width: 'max-content' }}
          title={`Estudiantes ${periodData && `- Período ${periodData.name} - ${periodData.year}`}`}
          bodyStyle={{ padding: '0' }}
        >
          <Table pagination={false} columns={columns} dataSource={data} />
        </Card>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  t: PropTypes.func.isRequired,
  periodData: PropTypes.shape({
    modules: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default withNamespaces('common')(AdminDashboard);
