import React from 'react';
import PropTypes from 'prop-types';

function PaymentVerification({ t }) {
  return (
    <div>
      <h1>{t('WaitPaymentVerification')}</h1>
      <h2>{t('ModuleAssuredHeader')}</h2>
      <h2>{t('EmailNotifOnFinish')}</h2>
    </div>
  );
}

PaymentVerification.propTypes = {
  t: PropTypes.func.isRequired,
};

export default PaymentVerification;
