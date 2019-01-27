import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ServerGetData } from '../../../../utils/fetch';
import { withNamespaces } from '../../../../i18n';
import RequireRole from '../../../../components/RequireRole';
import StudentPaymentStatusCard from '../../../../components/StudentPaymentStatusCard';

class PaymentPage extends Component {
  state = {};

  static async getInitialProps({ req }) {
    let periodData;

    try {
      const periodResponse = await ServerGetData('/period/current/students', req);
      const periodJson = await periodResponse.json();
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
    return (
      <RequireRole t={t} requiredRole='admin'>
        {() => (
          <div className='admin-payments-page'>
            <StudentPaymentStatusCard t={t} period={periodData} />
          </div>
        )}
      </RequireRole>
    );
  }
}

PaymentPage.propTypes = {
  t: PropTypes.func.isRequired,
  periodData: PropTypes.shape({
    modules: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default withNamespaces('common')(PaymentPage);
