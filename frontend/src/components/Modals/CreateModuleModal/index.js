import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../store/context/ModulesContext';

import Modal from '../../UI/Modal';
import ModalForm from '../ModalForm';
import ModuleFormFields from '../../Module/ModuleFormFields';

import { getModuleFormValidation } from '../../../lib/validation/forms';

const CreateModuleModal = ({ isVisible, onClose, period, ...props }) => {
  const { t } = useTranslation();
  const { createModule } = useModules();
  const handleSubmit = values => createModule(values, [onClose]);

  const { initialValues, schema } = getModuleFormValidation(t);

  return (
    <Modal title={t('Module.Create')} isVisible={isVisible} onClose={onClose} {...props}>
      <ModalForm
        initialValues={{
          ...initialValues,
          period_id: period.id,
        }}
        validationSchema={schema}
        onSubmit={handleSubmit}
        onCancel={onClose}
        formFields={ModuleFormFields}
        formType='create'
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
