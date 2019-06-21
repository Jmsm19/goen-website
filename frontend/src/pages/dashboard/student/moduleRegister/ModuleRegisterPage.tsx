import React from 'react';

import { useAuth } from '../../../../store/context/AuthContext';
import useActivePeriod from '../../../../hooks/useActivePeriod';
import useModal from '../../../../hooks/useModal';

import Loading from '../../../../components/Loading';
import PeriodDetailsHeader from '../../../../components/Period/PeriodDetails/PeriodDetailsHeader';
import ModuleRegistrationModal from '../../../../components/Modals/ModuleRegistrationModal';
import ModuleSelection from './ModuleSelection';

import StyledPage from './styles';

interface ModalProps {
  onClose: BtnClick;
  onAccept: BtnClick;
  module?: Module;
}

const ModuleRegisterPage: React.FC = () => {
  const { authUser, registerInModule } = useAuth();
  const activePeriod = useActivePeriod();
  const [selectedModule, setSelectedModule] = React.useState<Module | null>(null);
  const [toggleModal, modalProps] = useModal({
    onAccept: () => {
      if (selectedModule) registerInModule(selectedModule.id);
      toggleModal();
    },
    onClose: () => {
      toggleModal();
      setSelectedModule(null);
    },
    module: selectedModule,
  });

  const handleModuleSelect = (module: Module) => {
    toggleModal();
    setSelectedModule(module);
  };

  if (!activePeriod) {
    return <Loading />;
  }

  return (
    <StyledPage className='dashboard-student-module-register'>
      <PeriodDetailsHeader period={activePeriod} />

      {!!authUser && authUser.registrationStatus === 'idle' && (
        <>
          <ModuleSelection period={activePeriod} selectModule={handleModuleSelect} />
          {/* Modal */}
          <ModuleRegistrationModal
            isVisible={modalProps.isVisible}
            onAccept={modalProps.onAccept}
            onClose={modalProps.onClose}
            module={modalProps.module}
          />
        </>
      )}
    </StyledPage>
  );
};

ModuleRegisterPage.propTypes = {};

export default ModuleRegisterPage;
