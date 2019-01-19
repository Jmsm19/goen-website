import React from 'react';
import PropTypes from 'prop-types';
import { Steps, Icon } from 'antd';
import StyledSteps from '../../../styles/components/Registration/RegistrationSteps';

function RegistrationSteps({ t, registrationStatus }) {
  let currentStep;

  switch (registrationStatus) {
    case 'idle': {
      currentStep = 0;
      break;
    }
    case 'paying': {
      currentStep = 1;
      break;
    }
    default: {
      currentStep = 0;
      break;
    }
  }

  return (
    <StyledSteps direction='horizontal' current={currentStep}>
      <Steps.Step title={t('RegistrationSteps.Selection')} icon={<Icon type='user' />} />
      <Steps.Step title={t('RegistrationSteps.Payment')} icon={<Icon type='credit-card' />} />
      <Steps.Step
        title={t('RegistrationSteps.PaymentVerification')}
        icon={<Icon type='search' />}
      />
      <Steps.Step title={t('RegistrationSteps.Done')} icon={<Icon type='smile-o' />} />
    </StyledSteps>
  );
}

RegistrationSteps.defaultProps = {
  registrationStatus: 'idle',
};

RegistrationSteps.propTypes = {
  t: PropTypes.func.isRequired,
  registrationStatus: PropTypes.string,
};

export default RegistrationSteps;
