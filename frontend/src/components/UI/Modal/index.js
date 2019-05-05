import React, { useEffect, useContext, createRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { PoseGroup } from 'react-pose';
import { LayoutContext } from '../../../context/LayoutContext';

import { FadeInModalContent, SlideUpModal } from './animations';
import { StyledModal, StyledCloseBtn } from './styles';

const Modal = ({ isVisible, title, footerContent, children, onClose }) => {
  const modalRef = createRef();
  const { isMobile } = useContext(LayoutContext);
  // eslint-disable-next-line consistent-return
  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
    );
    const firstElement = focusableModalElements[0];
    const lastElement = focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([[27, onClose], [9, handleTabKey]]);

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
        className='backdrop'
        role='dialog'
        aria-modal='true'
        onClick={onClose}
      >
        <SlideUpModal className='modal' onClick={e => e.stopPropagation()}>
          <StyledCloseBtn className='close-btn' onClick={onClose} />
          {title && <div className='modal-header'>{title}</div>}
          <FadeInModalContent className='modal-content'>{children}</FadeInModalContent>
          {footerContent && <div className='modal-footer'>{footerContent}</div>}
        </SlideUpModal>
      </StyledModal>
    </PoseGroup>
  );

  return !!isVisible && createPortal(ModalElement, document.getElementById('portal'));
};

Modal.defaultProps = {
  footerContent: null,
  isVisible: false,
  title: null,
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  footerContent: PropTypes.node,
  isVisible: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Modal;
