import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { DialogContent } from '@material-ui/core';

import Modal from '../../UI/Modal';
import ModalConfirmationButtonArea from '../../Buttons/ModalConfirmationButtonArea';

const ConfirmationModal = ({ isVisible, onCancel, onAccept, warning, ...props }) => {
  const { t } = useTranslation();
  const warningText = warning || t('Confirmation.Warning');

  return (
    <Modal
      className='confirmation-modal'
      isVisible={isVisible}
      onClose={onCancel}
      animation='zoom'
      actionComponent={<ModalConfirmationButtonArea onYes={onAccept} onNo={onCancel} />}
      {...props}
    >
      <DialogContent>
        <p className='warning'>{warningText}</p>
      </DialogContent>
    </Modal>
  );
};

ConfirmationModal.defaultProps = {
  warning: null,
};

ConfirmationModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  warning: PropTypes.string,
};

export default ConfirmationModal;
