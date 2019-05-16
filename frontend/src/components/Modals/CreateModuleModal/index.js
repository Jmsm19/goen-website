import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../context/ModulesContext';
import { usePeriods } from '../../../context/PeriodsContext';

import Modal from '../../UI/Modal';
import ModalForm from '../ModalForm';
import ModuleFormFields from '../../Module/ModuleFormFields';

import { getModuleFormValidation } from '../../../lib/validation/forms';

const CreateModuleModal = ({ isVisible, onClose, period, ...props }) => {
  const { t } = useTranslation();
  const { createModule } = useModules();
  const { getPeriod, getActivePeriod } = usePeriods();
  const handlePeriodUpdate = () => (period.active ? getActivePeriod() : getPeriod(period.id));
  const handleSubmit = values => createModule(values, [onClose, handlePeriodUpdate]);

  const { initialValues, schema } = getModuleFormValidation(t);

  return (
    <Modal
      title={t('Module.Create')}
      isVisible={isVisible}
      onClose={onClose}
      withCloseButton={false}
      {...props}
    >
      <ModalForm
        initialValues={{
          ...initialValues,
          periodId: period.id,
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
        onCancel={onClose}
        formFields={ModuleFormFields}
      />
    </Modal>
  );
};

CreateModuleModal.propTypes = {
  period: PropTypes.shape().isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateModuleModal;
