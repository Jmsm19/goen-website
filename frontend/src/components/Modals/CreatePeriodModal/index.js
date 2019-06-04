import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Modal from '../../UI/Modal';
import { usePeriods } from '../../../store/context/PeriodsContext';
import ModalForm from '../ModalForm';
import PeriodFormFields from '../../Period/PeriodFormFields';

import { getPeriodFormValidation } from '../../../lib/validation/forms';

const CreatePeriodModal = ({ isVisible, onClose, ...props }) => {
  const { t } = useTranslation();
  const { createPeriod } = usePeriods();
  const handleSubmit = values => createPeriod(values, onClose);

  const { initialValues, schema } = getPeriodFormValidation(t);

  return (
    <Modal
      title={t('Period.Update')}
      isVisible={isVisible}
      onClose={onClose}
      animation='zoom'
      {...props}
    >
      <ModalForm
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        onCancel={onClose}
        formFields={PeriodFormFields}
        formType='create'
      />
    </Modal>
  );
};

CreatePeriodModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreatePeriodModal;
