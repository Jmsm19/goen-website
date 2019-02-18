import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { notification } from 'antd';
import RequireRole from '../../../../components/RequireRole';
import { withNamespaces } from '../../../../i18n';
import ModuleListCard from '../../../../components/Cards/ModuleListCard';
import { GetData } from '../../../../utils/fetch';
import StudentPaymentStatusCard from '../../../../components/Cards/StudentPaymentStatusCard';
import StyledPage from '../../../../styles/pages/dashboard/admin/PaymentsPage';

class PaymentsPage extends Component {
  state = {
    students: [],
  };

  async componentDidMount() {
    let periodData = null;

    try {
      const response = await GetData('/period/current/students');
      const json = await response.json();
      periodData = response.status === 200 ? json.data : null;

      this.setState({
        students: periodData ? periodData.students : [],
      });
    } catch (error) {
      notification.error({
        message: error,
      });
    }
  }

  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  render() {
    const { t, institution } = this.props;
    const { currentPeriod, confirmPayment, rejectPayment } = institution;
    const { students } = this.state;

    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <StyledPage>
            <div className='row'>
              <StudentPaymentStatusCard
                t={t}
                period={currentPeriod}
                students={students}
                confirmPayment={confirmPayment}
                rejectPayment={rejectPayment}
              />

              <ModuleListCard t={t} modules={currentPeriod ? currentPeriod.modules : []} />
            </div>
          </StyledPage>
        )}
      </RequireRole>
    );
  }
}

PaymentsPage.propTypes = {
  t: PropTypes.func.isRequired,
  institution: PropTypes.shape({
    currentPeriod: PropTypes.shape(),
    confirmPayment: PropTypes.func.isRequired,
    rejectPayment: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNamespaces('common')(PaymentsPage);
