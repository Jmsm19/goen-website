import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../store/context/ModulesContext';

import Modal from '../../UI/Modal';
import ModalForm from '../ModalForm';
import ModuleFormFields from '../../Module/ModuleFormFields';

import { getModuleUpdateValidation } from '../../../lib/validation/forms';

const UpdateModuleModal = ({ isVisible, onClose, module, deselectModule, ...props }) => {
  const { t } = useTranslation();
  const { updateModule } = useModules();
  const handleSubmit = values => updateModule(module.id, values, [onClose, deselectModule]);

  const { name, section, clan, schedule, instructor, assistant } = module;
  const initialValues = React.useMemo(
    () => ({
      name,
      section,
      schedule_id: schedule.id,
      instructor_id: instructor.id,
      assistant_id: assistant.id,
      clan: clan ? clan.name : undefined,
    }),
    [assistant.id, clan, instructor.id, name, schedule.id, section],
  );

  const { schema } = getModuleUpdateValidation(t);

  return (
    <Modal
      title={t('Period.Update')}
      isVisible={isVisible}
      onClose={onClose}
      animation='slideDown'
      {...props}
    >
      <ModalForm
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        submitBtnProps={{
          disabled: false,
        }}
        onCancel={onClose}
        formFields={ModuleFormFields}
        formType='update'
      />
    </Modal>
  );
};

UpdateModuleModal.defaultProps = {
  deselectModule: () => null,
};

UpdateModuleModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  module: PropTypes.shape().isRequired,
  deselectModule: PropTypes.func,
};

export default UpdateModuleModal;
