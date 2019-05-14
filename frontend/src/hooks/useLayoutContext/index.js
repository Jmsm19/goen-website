import { useContext } from 'react';

import { LayoutContext } from '../../context/LayoutContext';

const useLayoutContext = () => {
  const { isMobile } = useContext(LayoutContext);

  return {
    isMobile,
  };
};

export default useLayoutContext;
