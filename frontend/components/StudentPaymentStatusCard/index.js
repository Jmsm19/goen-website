import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import StudentPaymentStatusTable from '../StudentPaymentStatusTable';
import StyledCard from '../../styles/components/StudentPaymentStatusCard';
import { GetData } from '../../utils/fetch';

class StudentPaymentStatusCard extends Component {
  state = {
    currentTab: 'verifying',
    stateStudents: null,
    loading: false,
  };

  updateStudents = () =>
    this.setState(
      {
        loading: true,
      },
      () => {
        GetData('/period/current/students')
          .then(res => res.json())
          .then(({ data }) =>
            this.setState({
              stateStudents: data.students,
              loading: false,
            }),
          )
          .catch(({ error, message }) => {
            notification.error({
              message: error || message,
            });
          });
      },
    );

  handleTabChange = key => {
    this.setState({ currentTab: key });
  };

  makeAccordion = status => {
    const { loading, stateStudents } = this.state;
    const { t, students, period, confirmPayment, rejectPayment } = this.props;
    const modules = period ? period.modules : [];
    const studentsArr = stateStudents || students;
    const panels = [];

    modules.forEach(module => {
      const moduleName = `${module.name} - ${module.section}`;
      const filteredStudents = studentsArr.filter(
        student => student.registrationStatus === status && module.id === student.currentModule.id,
      );
      const studentCount = filteredStudents.length;

      if (studentCount > 0) {
        panels.push(
          <StudentPaymentStatusTable
            t={t}
            key={moduleName}
            title={moduleName}
            loading={loading}
            students={filteredStudents}
            confirmPayment={confirmPayment}
            rejectPayment={rejectPayment}
            updateStudents={this.updateStudents}
          />,
        );
      }
    });

    return panels.length > 0 ? panels : <StudentPaymentStatusTable t={t} students={[]} />;
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
  confirmPayment: PropTypes.func.isRequired,
  rejectPayment: PropTypes.func.isRequired,
};

export default StudentPaymentStatusCard;
