import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import ModuleDetailsModal from '../../Modals/ModuleDetailsModal';
import ConfirmationModal from '../../Modals/ConfirmationModal';

import {
  StyledContainer,
  StyledSummarySection,
  StyledModulesSection,
  StyledHeaderSection,
} from './styles';

const PeriodDetails = ({ period, deletePeriod }) => {
  const { t } = useTranslation();
  const [selectedModule, setSelectedModule] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const deselectModule = () => setSelectedModule(null);

  return (
    <StyledContainer>
      {/* Content */}
      <StyledHeaderSection period={period} deletePeriod={() => setShowConfirmationModal(true)} />

      <StyledSummarySection t={t} period={period} />

      <h2 className='section-title'>{t('Module._plural')}</h2>
      <StyledModulesSection t={t} modules={period.modules} selectModule={setSelectedModule} />
      {/* End of content */}

      {/* Modals */}
      <ModuleDetailsModal
        isVisible={!!selectedModule}
        module={selectedModule}
        onClose={deselectModule}
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
    </StyledContainer>
  );
};

PeriodDetails.propTypes = {
  period: PropTypes.shape().isRequired,
  deletePeriod: PropTypes.func.isRequired,
};

export default PeriodDetails;
