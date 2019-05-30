import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { createPortal } from 'react-dom';
import { PoseGroup } from 'react-pose';

import { useLayout } from '../../../store/context/LayoutContext';

import { FadeInModalContent, SlideUpModal } from './animations';
import { StyledModal, StyledCloseBtn } from './styles';

const Modal = props => {
  const {
    isVisible,
    title,
    headerContent,
    footerContent,
    children,
    onClose,
    className,
    withCloseButton,
  } = props;

  const { isMobile } = useLayout();

  const keyListenersMap = new Map([[27, onClose]]);
  const modalClassName = classnames('backdrop', className);

  React.useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    document.addEventListener('keydown', keyListener);

    return () => document.removeEventListener('keydown', keyListener);
  });

  const ModalElement = (
    <PoseGroup animateOnMount>
      <StyledModal
        key='modal'
        isMobile={isMobile}
        className={modalClassName}
        role='dialog'
        aria-modal='true'
        onClick={onClose}
      >
        <SlideUpModal className='portal-modal' onClick={e => e.stopPropagation()}>
          {/* Close Btn */}
          {withCloseButton && <StyledCloseBtn size={40} className='close-btn' onClick={onClose} />}
          {/* Header */}
          <div className='portal-modal-header'>{title || headerContent}</div>
          {/* Content */}
          <FadeInModalContent className='portal-modal-content'>{children}</FadeInModalContent>
          {/* Footer */}
          {footerContent && <div className='portal-modal-footer'>{footerContent}</div>}
        </SlideUpModal>
      </StyledModal>
    </PoseGroup>
  );

  return !!isVisible && createPortal(ModalElement, document.getElementById('portal'));
};

Modal.defaultProps = {
  footerContent: null,
  headerContent: null,
  isVisible: false,
  title: null,
  withCloseButton: true,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  footerContent: PropTypes.node,
  headerContent: PropTypes.node,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  withCloseButton: PropTypes.bool,
};

export default Modal;
