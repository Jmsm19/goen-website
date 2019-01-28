import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Collapse } from 'antd';
import StudentPaymentStatusTable from '../StudentPaymentStatusTable';
import { CardCollapsingPanel } from '../../styles/pages/GeneralStyles';
import StyledCard from '../../styles/components/StudentPaymentStatusCard';

class StudentPaymentStatusCard extends Component {
  state = {
    currentTab: 'verifying',
  };

  handleTabChange = key => {
    this.setState({ currentTab: key });
  };

  makeAccordion = status => {
    const { t, students, period } = this.props;
    const modules = period ? period.modules : [];

    const panels = [];

    modules.forEach(module => {
      const moduleName = `${module.name} - ${module.section}`;
      const filteredStudents = students.filter(student => {
        const studentModule = `${student.currentModule.name} - ${student.currentModule.section}`;
        return student.registrationStatus === status && moduleName === studentModule;
      });
      const studentCount = filteredStudents.length;
      let cardHeader = moduleName;

      if (status === 'verifying payment') {
        cardHeader += ` (${t('PendingCount', {
          count: studentCount,
        })})`;
      }

      if (studentCount > 0) {
        panels.push(
          <CardCollapsingPanel key={uuid()} header={cardHeader}>
            <StudentPaymentStatusTable t={t} students={filteredStudents} />
          </CardCollapsingPanel>,
        );
      }
    });

    return panels.length > 0 ? (
      <Collapse accordion>{panels}</Collapse>
    ) : (
      <StudentPaymentStatusTable t={t} students={[]} />
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
      <StyledCard
        tabList={tabList}
        defaultActiveTabKey={currentTab}
        onTabChange={this.handleTabChange}
        title={`${t('Payments')} ${period && `- ${t('Period')} ${period.name} - ${period.year}`}`}
        bodyStyle={{ padding: '0' }}
      >
        {contentList[currentTab]}
      </StyledCard>
    );
  }
}

StudentPaymentStatusCard.defaultProps = {
  period: null,
};

StudentPaymentStatusCard.propTypes = {
  t: PropTypes.func.isRequired,
  period: PropTypes.shape({
    name: PropTypes.string,
    year: PropTypes.number,
    modules: PropTypes.arrayOf(PropTypes.shape()),
  }),
  students: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default StudentPaymentStatusCard;
