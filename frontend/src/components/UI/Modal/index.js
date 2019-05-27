import React, { useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { PoseGroup } from 'react-pose';
import { LayoutContext } from '../../../store/context/LayoutContext';

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

  const { isMobile } = useContext(LayoutContext);

  const keyListenersMap = new Map([[27, onClose]]);
  const modalClassName = classnames('backdrop', className);

  useEffect(() => {
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
        <SlideUpModal className='modal' onClick={e => e.stopPropagation()}>
          {/* Close Btn */}
          {withCloseButton && <StyledCloseBtn size={40} className='close-btn' onClick={onClose} />}
          {/* Header */}
          <div className='modal-header'>{title || headerContent}</div>
          {/* Content */}
          <FadeInModalContent className='modal-content'>{children}</FadeInModalContent>
          {/* Footer */}
          {footerContent && <div className='modal-footer'>{footerContent}</div>}
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
