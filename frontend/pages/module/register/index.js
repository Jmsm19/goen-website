import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withNamespaces } from '../../../i18n';
import StyledPage from '../../../styles/pages/ModuleRegisterPage';
import RegistrationSteps from '../../../components/Registration/RegistrationSteps';
import ModuleSelection from '../../../components/Registration/ModuleSelection';
import PaymentProcessing from '../../../components/Registration/PaymenProcessing';
import RegisteredMessage from '../../../components/Registration/RegisteredMessage';
import PaymentVerification from '../../../components/Registration/PaymentVerification';
import RequireStudentRole from '../../../components/RequireStudentRole';
import { InstitutionContextConsumer } from '../../../context/InstitutionContext';

class ModuleRegisterPage extends Component {
  static async getInitialProps() {
    return {
      namespacesRequired: ['common'],
    };
  }

  render() {
    const { t, lng } = this.props;

    return (
      <RequireStudentRole t={t}>
        {({ authUser, setRegistrationStatus }) => {
          const { registrationStatus } = authUser;
          return (
            <StyledPage>
              <InstitutionContextConsumer>
                {registrationActive =>
                  registrationActive ? (
                    <>
                      <RegistrationSteps t={t} registrationStatus={registrationStatus} />
                      {registrationStatus === 'idle' && (
                        <ModuleSelection
                          t={t}
                          lng={lng}
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
                  )
                }
              </InstitutionContextConsumer>
            </StyledPage>
          );
        }}
      </RequireStudentRole>
    );
  }
}

ModuleRegisterPage.propTypes = {
  t: PropTypes.func.isRequired,
  lng: PropTypes.string.isRequired,
};

export default withNamespaces('common')(ModuleRegisterPage);
export const CleanModuleRegisterPage = ModuleRegisterPage;
