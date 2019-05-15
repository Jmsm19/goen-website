import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../context/AuthContext';

import ModuleDetailsModal from '../../Modals/ModuleDetailsModal';
import UpdatePeriodModal from '../../Modals/UpdatePeriodModal';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import CreateModuleModal from '../../Modals/CreateModuleModal';

import {
  StyledContainer,
  StyledSummarySection,
  StyledModulesSection,
  StyledHeaderSection,
} from './styles';

const PeriodDetails = ({ period, deletePeriod }) => {
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const [selectedModule, setSelectedModule] = useState(null);
  const [isEditingPeriod, setIsEditingPeriod] = useState(false);
  const [showModuleCreateModal, setShowModuleCreateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const deselectModule = () => setSelectedModule(null);

  return (
    <StyledContainer>
      {/* Content */}
      <StyledHeaderSection
        period={period}
        deletePeriod={() => setShowConfirmationModal(true)}
        updatePeriod={() => setIsEditingPeriod(true)}
      />

      <StyledSummarySection t={t} period={period} />

      <h2 className='section-title'>{t('Module._plural')}</h2>
      <StyledModulesSection
        t={t}
        modules={period.modules}
        selectModule={setSelectedModule}
        showCreateCard={authUser.isAdmin}
        onCreateCardClick={() => setShowModuleCreateModal(true)}
      />
      {/* End of content */}

      {/* Modals */}
      <ModuleDetailsModal
        isVisible={!!selectedModule}
        module={selectedModule}
        onClose={deselectModule}
      />
      <UpdatePeriodModal
        period={period}
        isVisible={isEditingPeriod}
        onClose={() => setIsEditingPeriod(false)}
      />
      <ConfirmationModal
        isVisible={showConfirmationModal}
        onAccept={() => {
          deletePeriod(period.id);
          setShowConfirmationModal(false);
        }}
        onCancel={() => {
          setShowConfirmationModal(false);
        }}
      />
      <CreateModuleModal
        isVisible={showModuleCreateModal}
        onClose={() => setShowModuleCreateModal(false)}
      />
    </StyledContainer>
  );
};

PeriodDetails.propTypes = {
  period: PropTypes.shape().isRequired,
  deletePeriod: PropTypes.func.isRequired,
};

export default PeriodDetails;
