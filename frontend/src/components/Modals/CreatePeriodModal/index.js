import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Modal from '../../UI/Modal';
import PeriodCreateForm from '../../Period/PeriodCreateForm';
import usePeriodDataContext from '../../../hooks/usePeriodDataContext';

const CreatePeriodModal = ({ isVisible, onClose, ...props }) => {
  const { t } = useTranslation();
  const { createPeriod } = usePeriodDataContext();
  const handleSubmit = values => createPeriod(values, onClose);

  return (
    <Modal
      title={t('Period.Create')}
      isVisible={isVisible}
      onClose={onClose}
      withCloseButton={false}
      {...props}
    >
      <PeriodCreateForm onSubmit={handleSubmit} onCancel={onClose} />
    </Modal>
  );
};

CreatePeriodModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreatePeriodModal;
