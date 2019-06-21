import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../store/context/ModulesContext';

import Modal from '../../UI/Modal';
import ModalForm from '../ModalForm';
import ModuleFormFields from '../../Module/ModuleFormFields';

import { ModuleFormSetup } from '../../../lib/validation';
import { PeriodPropType } from '../../../lib/validation/propTypesValues';

interface Props {
  isVisible: boolean;
  onClose: BtnClick;
  period: Period;
}

const CreateModuleModal: React.FC<Props> = ({ isVisible, onClose, period, ...props }) => {
  const { t } = useTranslation();
  const { createModule } = useModules();
  const handleSubmit = (values: {}) => createModule(values, [onClose]);

  const { initialValues, validate } = ModuleFormSetup;

  return (
    <Modal
      title={t('Module.Create')}
      isVisible={isVisible}
      onClose={onClose}
      animation='zoom'
      {...props}
    >
      <ModalForm
        initialValues={{
          ...initialValues,
          period_id: period.id,
        }}
        validationFunc={validate}
        onSubmit={handleSubmit}
        onCancel={onClose}
        formFields={ModuleFormFields}
        formType='create'
      />
    </Modal>
  );
};

CreateModuleModal.propTypes = {
  period: PeriodPropType.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreateModuleModal;
