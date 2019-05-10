import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Modal from '../../UI/Modal';
import PeriodCreateForm from '../../Period/PeriodCreateForm';
import { DataContext } from '../../../context/DataContext';

const CreatePeriodModal = ({ isVisible, onClose, ...props }) => {
  const { t } = useTranslation();
  const { createPeriod } = useContext(DataContext);
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
