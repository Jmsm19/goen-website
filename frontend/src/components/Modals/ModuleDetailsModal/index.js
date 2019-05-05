import React from 'react';
import PropTypes from 'prop-types';

import Modal from '../../UI/Modal';
import ModuleDetails from '../../Module/ModuleDetails';

const ModuleDetailsModal = ({ module, isVisible, onClose }) => (
  <Modal isVisible={isVisible} onClose={onClose}>
    {!!module && <ModuleDetails module={module} />}
  </Modal>
);

ModuleDetailsModal.defaultProps = {
  module: null,
  isVisible: false,
};

ModuleDetailsModal.propTypes = {
  module: PropTypes.shape(),
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};

export default ModuleDetailsModal;
