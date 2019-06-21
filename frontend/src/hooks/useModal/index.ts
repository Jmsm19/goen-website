import React from 'react';

type toggleFunction = (state?: boolean) => void;
interface Args {
  isVisible: boolean;
  onClose: () => void;
  [key: string]: any;
}
type Output = [toggleFunction, Args];

/**
 * Hooks for easier configuration and usage of Modal components
 *
 * @param {{}} modalProps
 * @returns {[(boolean) => void, {}]} [toggleModal, modalProps]
 */
const useModal = (modalProps: {}): Output => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleModal: toggleFunction = state => setIsVisible(state || !isVisible);

  const onClose = () => setIsVisible(false);

  return [toggleModal, { isVisible, onClose, ...modalProps }];
};

export default useModal;
