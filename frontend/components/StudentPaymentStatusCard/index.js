import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Card, Collapse } from 'antd';
import { CardCollapsingPanel } from '../../styles/pages/GeneralStyles';
import PendingPaymentsTable from '../PendingPaymentsTable';

class StudentPaymentStatusCard extends Component {
  state = {
    currentTab: 'verifying',
  };

  handleTabChange = key => {
    this.setState({ currentTab: key });
  };

  makeAccordion = status => {
    const { t, period } = this.props;
    const modules = period ? period.modules : [];

    return (
      <Collapse accordion>
        {modules.map(module => {
          const moduleName = `${module.name} - ${module.section}`;
          const { students } = module;
          const pendingStudentsCount = students.filter(
            student => student.registrationStatus === status,
          ).length;

          return (
            pendingStudentsCount > 0 && (
              <CardCollapsingPanel
                key={uuid()}
                style={{ width: '400px' }}
                header={`${moduleName} (${t('PendingCount', {
                  count: pendingStudentsCount,
                })})`}
              >
                <PendingPaymentsTable t={t} students={students} />
              </CardCollapsingPanel>
            )
          );
        })}
      </Collapse>
    );
  };

  render() {
    const { t, period } = this.props;
    const { currentTab } = this.state;

    const tabList = [
      {
        key: 'verifying',
        tab: t('Verifying'),
      },
      {
        key: 'pending',
        tab: t('Pending'),
      },
      {
        key: 'confirmed',
        tab: t('Confirmed'),
      },
    ];

    const contentList = {
      verifying: this.makeAccordion('verifying payment'),
      pending: this.makeAccordion('paying'),
      confirmed: this.makeAccordion('registered'),
    };

    return (
      <Card
        tabList={tabList}
        defaultActiveTabKey={currentTab}
        onTabChange={this.handleTabChange}
        style={{ marginTop: '10px', width: 'max-content' }}
        title={`${t('Payments')} ${period && `- ${t('Period')} ${period.name} - ${period.year}`}`}
        bodyStyle={{ padding: '0' }}
      >
        {contentList[currentTab]}
      </Card>
    );
  }
}

StudentPaymentStatusCard.propTypes = {
  t: PropTypes.func.isRequired,
  period: PropTypes.shape({
    name: PropTypes.string,
    year: PropTypes.number,
    modules: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default StudentPaymentStatusCard;
