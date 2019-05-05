import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { enquireScreen, StopEnquireScreen } from '../lib/utils/enquire';

const LayoutContext = React.createContext();

const LayoutContextProvider = ({ children }) => {
  // eslint-disable-next-line no-unused-vars
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    enquireScreen(isMob => {
      setIsMobile(!!isMob);
    });

    return () => StopEnquireScreen();
  });

  const state = {
    isMobile,
  };

  return <LayoutContext.Provider value={{ ...state }}>{children}</LayoutContext.Provider>;
};

LayoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LayoutContext, LayoutContextProvider };
