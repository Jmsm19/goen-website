import React, { useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Detector as ConnectivityDetector } from 'react-detect-offline';

import { enquireScreen, StopEnquireScreen } from '../lib/utils/enquire';
import OfflineNotification from '../components/OfflineNotification';

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

  return (
    <LayoutContext.Provider value={{ ...state }}>
      <ConnectivityDetector
        render={({ online }) => (
          <>
            <OfflineNotification isOnline={online} />
            {children}
          </>
        )}
      />
    </LayoutContext.Provider>
  );
};

LayoutContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LayoutContext, LayoutContextProvider };
