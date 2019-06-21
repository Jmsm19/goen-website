import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../store/context/ModulesContext';

import Modal from '../../UI/Modal';
import ModalForm from '../ModalForm';
import ModuleFormFields from '../../Module/ModuleFormFields';

import { ModuleFormSetup } from '../../../lib/validation';
import { ModulePropType } from '../../../lib/validation/propTypesValues';

interface Props {
  isVisible: boolean;
  onClose: BtnClick;
  module: Module;
}

const UpdateModuleModal: React.FC<Props> = props => {
  const { isVisible, onClose, module, ...rest } = props;
  const { t } = useTranslation();
  const { updateModule } = useModules();
  const handleSubmit = (values: {}) => updateModule(module.id, values, onClose);

  const { name, section, clan, schedule, instructor, assistant } = module;
  const initialValues = React.useMemo(
    () => ({
      name,
      section,
      schedule_id: schedule.id,
      instructor_id: instructor ? instructor.id : null,
      assistant_id: assistant ? assistant.id : null,
      clan: clan ? clan.name : undefined,
    }),
    [assistant, clan, instructor, name, schedule.id, section],
  );

  const { validate } = ModuleFormSetup;

  return (
    <Modal
      title={t('Module.Update')}
      isVisible={isVisible}
      onClose={onClose}
      animation='slideDown'
      {...rest}
    >
      <ModalForm
        initialValues={initialValues}
        validationFunc={validate}
        onSubmit={handleSubmit}
        submitBtnProps={{ disabled: false }}
        onCancel={onClose}
        formFields={ModuleFormFields}
        formType='update'
      />
    </Modal>
  );
};

UpdateModuleModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  module: ModulePropType.isRequired,
};

export default UpdateModuleModal;
