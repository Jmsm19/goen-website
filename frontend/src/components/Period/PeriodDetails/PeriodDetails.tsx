import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../store/context/AuthContext';

import ModuleDetailsModal from '../../Modals/ModuleDetailsModal';
import UpdatePeriodModal from '../../Modals/UpdatePeriodModal';
import ConfirmationModal from '../../Modals/ConfirmationModal';
import CreateModuleModal from '../../Modals/CreateModuleModal';

import { PeriodPropType } from '../../../lib/validation/propTypesValues';
import {
  StyledContainer,
  StyledSummarySection,
  StyledModulesSection,
  StyledHeaderSection,
} from './styles';

interface Props {
  period: Period;
  deletePeriod: (id: string) => Promise<void>;
}

const PeriodDetails: React.FC<Props> = ({ period, deletePeriod }) => {
  const { t } = useTranslation();
  const { authUser } = useAuth();
  const [selectedModule, setSelectedModule] = useState<string | undefined>(undefined);
  const [isEditingPeriod, setIsEditingPeriod] = useState(false);
  const [showModuleCreateModal, setShowModuleCreateModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const deselectModule = () => setSelectedModule(undefined);

  return (
    <StyledContainer>
      {/* Content */}
      <StyledHeaderSection
        period={period}
        deletePeriod={() => setShowConfirmationModal(true)}
        updatePeriod={() => setIsEditingPeriod(true)}
      />

      <StyledSummarySection period={period} />

      <h2 className='section-title'>{t('Module._plural')}</h2>
      <StyledModulesSection
        periodId={period.id}
        onCardClick={module => setSelectedModule(module.id)}
        showCreateCard={!!authUser && authUser.isAdmin && period.active}
        onCreateCardClick={() => setShowModuleCreateModal(true)}
      />
      {/* End of content */}

      {/* Modals */}
      <ModuleDetailsModal
        isVisible={!!selectedModule}
        moduleId={selectedModule}
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
        period={period}
        isVisible={showModuleCreateModal}
        onClose={() => setShowModuleCreateModal(false)}
      />
    </StyledContainer>
  );
};

PeriodDetails.propTypes = {
  period: PeriodPropType.isRequired,
  deletePeriod: PropTypes.func.isRequired,
};

export default PeriodDetails;
