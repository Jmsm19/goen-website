import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Modal from '../../UI/Modal';

import StyledButtonArea from './styles';

const ConfirmationModal = ({ isVisible, onCancel, onAccept, warning, ...props }) => {
  const { t } = useTranslation();
  const warningText = warning || t('Confirmation.Warning');

  return (
    <Modal
      withCloseButton={false}
      className='confirmation-modal'
      isVisible={isVisible}
      onClose={onCancel}
      footerContent={<StyledButtonArea onAccept={onAccept} onCancel={onCancel} />}
      {...props}
    >
      <p className='warning'>{warningText}</p>
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
