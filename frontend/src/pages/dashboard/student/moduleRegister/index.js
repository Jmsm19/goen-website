import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuth } from '../../../../store/context/AuthContext';
import useActivePeriod from '../../../../hooks/useActivePeriod';
import useModal from '../../../../hooks/useModal';

import Loading from '../../../../components/Loading';
import PeriodDetailsHeader from '../../../../components/Period/PeriodDetails/PeriodDetailsHeader';
import ModuleRegistrationModal from '../../../../components/Modals/ModuleRegistrationModal';

import ModuleSelection from './ModuleSelection';
import PaymentSection from './PaymentSection';

import StyledPage from './styles';

const ModuleRegisterPage = (props: void): React.Node => {
  const { authUser, registerInModule } = useAuth();
  const activePeriod = useActivePeriod();
  const [selectedModule, setSelectedModule] = React.useState(null);
  const [toggleModuleRegistrationModal, moduleRegistrationModalProps] = useModal({
    onAccept: () => {
      registerInModule(selectedModule.id);
      toggleModuleRegistrationModal();
    },
    onClose: () => {
      toggleModuleRegistrationModal();
      setSelectedModule(null);
    },
    module: selectedModule,
  });

  const handleModuleSelect = module => {
    toggleModuleRegistrationModal();
    setSelectedModule(module);
  };

  if (!activePeriod) {
    return <Loading />;
  }

  return (
    <StyledPage className='dashboard-student-module-register'>
      <PeriodDetailsHeader period={activePeriod} />

      {authUser.registrationStatus === 'idle' && (
        <>
          <ModuleSelection period={activePeriod} selectModule={handleModuleSelect} />
          {/* Modal */}
          <ModuleRegistrationModal {...moduleRegistrationModalProps} />
        </>
      )}

      {authUser.registrationStatus === 'paying' && <PaymentSection />}

      {authUser.registrationStatus === 'verifying payment' && <h1>Verifying payment</h1>}

      {authUser.registrationStatus === 'registered' && <Redirect exact to='/dashboard/settings' />}
    </StyledPage>
  );
};

ModuleRegisterPage.propTypes = {};

export default ModuleRegisterPage;
