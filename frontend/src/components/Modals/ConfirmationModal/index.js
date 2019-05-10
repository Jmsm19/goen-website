import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Modal from '../../UI/Modal';
import StyledButtonArea from './styles';
import { LayoutContext } from '../../../context/LayoutContext';

const ConfirmationModal = ({ isVisible, onCancel, onAccept, warning, ...props }) => {
  const { t } = useTranslation();
  const { isMobile } = useContext(LayoutContext);
  const warningText = warning || t('Confirmation.Warning');

  return (
    <Modal
      className='confirmation-modal'
      isVisible={isVisible}
      onClose={onCancel}
      footerContent={
        <StyledButtonArea isMobile={isMobile} onAccept={onAccept} onCancel={onCancel} />
      }
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
