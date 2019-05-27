import { useContext } from 'react';

import { LayoutContext } from '../../store/context/LayoutContext';

const useLayoutContext = () => {
  const { isMobile } = useContext(LayoutContext);

  return {
    isMobile,
  };
};

export default useLayoutContext;
