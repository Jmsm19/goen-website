import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { usePeriods } from '../../../store/context/PeriodsContext';

import Modal from '../../UI/Modal';
import ModalForm from '../ModalForm';
import PeriodFormFields from '../../Period/PeriodFormFields';

import { CreatePeriodFormSetup } from '../../../lib/validation';

interface Props {
  isVisible: boolean;
  onClose: BtnClick;
}

const CreatePeriodModal: React.FC<Props> = ({ isVisible, onClose, ...props }) => {
  const { t } = useTranslation();
  const { createPeriod } = usePeriods();
  const handleSubmit = (values: {}) => createPeriod(values, onClose);

  const { initialValues, validate } = CreatePeriodFormSetup;

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
        validationFunc={validate}
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
