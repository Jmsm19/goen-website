import React from 'react';

import { useAuth } from '../../../../context/AuthContext';
import useActivePeriod from '../../../../hooks/useActivePeriod';
import useModal from '../../../../hooks/useModal';

import Loading from '../../../../components/Loading';
import PeriodDetailsHeader from '../../../../components/Period/PeriodDetails/PeriodDetailsHeader';
import ModuleSelection from './ModuleSelection';
import ModuleRegistrationModal from '../../../../components/Modals/ModuleRegistrationModal';

import StyledPage from './styles';

const ModuleRegisterPage = props => {
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
    </StyledPage>
  );
};

ModuleRegisterPage.propTypes = {};

export default ModuleRegisterPage;
