import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ServerGetData } from '../../../../utils/fetch';
import { withNamespaces } from '../../../../i18n';
import RequireRole from '../../../../components/RequireRole';
import { InstitutionContextConsumer } from '../../../../context/InstitutionContext';
import StudentPaymentStatusCard from '../../../../components/StudentPaymentStatusCard';
import StyledPage from '../../../../styles/pages/dashboard/admin/PaymentsPage';

class PaymentPage extends Component {
  state = {};

  static async getInitialProps({ req }) {
    let periodData = null;

    try {
      const periodResponse = await ServerGetData('/period/current/students', req);
      const periodJson = await periodResponse.json();
      periodData = periodJson.data;
    } catch (error) {
      console.log(error);
    }

    return {
      namespacesRequired: ['common'],
      students: periodData.students,
      period: periodData.period,
    };
  }

  render() {
    const { students, t } = this.props;

    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <StyledPage>
            <InstitutionContextConsumer>
              {({ currentPeriod }) => (
                <StudentPaymentStatusCard t={t} period={currentPeriod} students={students} />
              )}
            </InstitutionContextConsumer>
          </StyledPage>
        )}
      </RequireRole>
    );
  }
}

PaymentPage.propTypes = {
  t: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withNamespaces('common')(PaymentPage);
