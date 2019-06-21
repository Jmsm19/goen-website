import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../UI/Modal';
import ModuleDetails from '../../Module/ModuleDetails';
import { useModules } from '../../../store/context/ModulesContext';

interface Props {
  onClose: BtnClick;
  isVisible?: boolean;
  moduleId?: string;
}

const ModuleDetailsModal: React.FC<Props> = ({ moduleId, isVisible, onClose }) => {
  const { modules } = useModules();
  const module = modules.get(moduleId || '');

  return (
    <Modal
      title={module ? module.name : ''}
      isVisible={isVisible}
      onClose={onClose}
      withToolbar
      animation='fade'
      fullScreen
    >
      {!!module && <ModuleDetails module={module} deselectModule={onClose} />}
    </Modal>
  );
};

ModuleDetailsModal.defaultProps = {
  moduleId: undefined,
  isVisible: false,
};

ModuleDetailsModal.propTypes = {
  moduleId: PropTypes.string,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ModuleDetailsModal;
