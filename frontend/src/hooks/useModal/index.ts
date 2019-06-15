import React from 'react';

/**
 * Hooks for easier configuration and usage of Modal components
 *
 * @param {{}} modalProps
 * @returns {[(boolean) => void, {}]} [toggleModal, modalProps]
 */
const useModal = (modalProps = {}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleModal = (state: boolean) => setIsVisible(state || !isVisible);

  const onClose = () => setIsVisible(false);

  return [toggleModal, { isVisible, onClose, ...modalProps }];
};

export default useModal;
