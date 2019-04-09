import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from '../../../../i18n';
import StyledPage from '../../../../styles/pages/ModuleRegisterPage';
import RegistrationSteps from '../../../../components/RegistrationPage/RegistrationSteps';
import ModuleSelection from '../../../../components/RegistrationPage/ModuleSelection';
import PaymentProcessing from '../../../../components/RegistrationPage/PaymenProcessing';
import RegisteredMessage from '../../../../components/RegistrationPage/RegisteredMessage';
import PaymentVerification from '../../../../components/RegistrationPage/PaymentVerification';
import RequireRole from '../../../../components/RequireRole';

class ModuleRegisterPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  render() {
    const { t, lng, institution } = this.props;
    const { currentPeriod, registrationActive } = institution;

    return (
      <RequireRole t={t} requiredRole='student'>
        {({ authUser, setRegistrationStatus }) => {
          const { registrationStatus } = authUser;
          return (
            <StyledPage>
              {registrationActive ? (
                <>
                  <RegistrationSteps t={t} registrationStatus={registrationStatus} />
                  {registrationStatus === 'idle' && (
                    <ModuleSelection
                      t={t}
                      lng={lng}
                      currentPeriod={currentPeriod}
                      passedModules={authUser.passedModules}
                      setRegistrationStatus={setRegistrationStatus}
                    />
                  )}

                  {registrationStatus === 'paying' && (
                    <PaymentProcessing t={t} setRegistrationStatus={setRegistrationStatus} />
                  )}

                  {registrationStatus === 'verifying payment' && <PaymentVerification t={t} />}

                  {registrationStatus === 'registered' && (
                    <RegisteredMessage t={t} setRegistrationStatus={setRegistrationStatus} />
                  )}
                </>
              ) : (
                <h1>Registrations are not open at the moment</h1>
              )}
            </StyledPage>
          );
        }}
      </RequireRole>
    );
  }
}

ModuleRegisterPage.propTypes = {
  t: PropTypes.func.isRequired,
  lng: PropTypes.string.isRequired,
  institution: PropTypes.shape({
    currentPeriod: PropTypes.shape(),
    registrationActive: PropTypes.bool,
  }).isRequired,
};

export default withNamespaces('common')(ModuleRegisterPage);
export const CleanModuleRegisterPage = ModuleRegisterPage;
