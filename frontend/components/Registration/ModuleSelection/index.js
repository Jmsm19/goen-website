import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Modal, notification } from 'antd';
import uuid from 'uuid/v4';
import { SendData } from '../../../utils/fetch';
import {
  StyledModulesGrid,
  StyledPageContent,
} from '../../../styles/components/Registration/ModuleSelection';
import ModuleCard from '../../ModuleCard';
import ModuleSelectionHeader from '../ModuleSelectionHeader';

function ModuleSelection({
  mounted,
  periodName,
  modules,
  lng,
  t,
  setRegistrationStatus,
  canRegisterIn,
  filterModules,
}) {
  const handleModuleRegistration = moduleId => {
    SendData('POST', `/module/${moduleId}/register`)
      .then(response => response.json())
      .then(({ error }) => {
        if (error) {
          throw Error(error);
        }
        setRegistrationStatus('paying');
      })
      .catch(({ error, message }) =>
        notification.error({
          message: error || message,
        }),
      );
  };

  const toggleConfirmPopFor = moduleId => {
    Modal.confirm({
      title: t('ModuleRegisterConfirm'),
      width: 'max-content',
      okText: t('Yes'),
      okType: 'primary',
      centered: true,
      cancelText: t('No'),
      onOk() {
        handleModuleRegistration(moduleId);
      },
    });
  };

  return (
    <Skeleton loading={!mounted} active>
      <StyledPageContent>
        <ModuleSelectionHeader t={t} periodName={periodName} filterModules={filterModules} />
        <StyledModulesGrid>
          {modules &&
            modules.map(module => (
              <ModuleCard
                key={uuid()}
                t={t}
                lng={lng}
                module={module}
                canRegister={canRegisterIn(module)}
                toggleConfirmPopFor={toggleConfirmPopFor}
              />
            ))}
        </StyledModulesGrid>
      </StyledPageContent>
    </Skeleton>
  );
}

ModuleSelection.defaultProps = {
  modules: [],
};

ModuleSelection.propTypes = {
  canRegisterIn: PropTypes.func.isRequired,
  filterModules: PropTypes.func.isRequired,
  lng: PropTypes.string.isRequired,
  modules: PropTypes.arrayOf(PropTypes.shape()),
  mounted: PropTypes.bool.isRequired,
  periodName: PropTypes.string.isRequired,
  setRegistrationStatus: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default ModuleSelection;
