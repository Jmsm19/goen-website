import React, { useLayoutEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Detector as ConnectivityDetector } from 'react-detect-offline';

import { enquireScreen, StopEnquireScreen } from '../../lib/utils/enquire';
import OfflineNotification from '../../components/OfflineNotification';

const LayoutContext = React.createContext();

const LayoutProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    enquireScreen(isMob => {
      setIsMobile(!!isMob);
    });

    return () => StopEnquireScreen();
  });

  const state = useMemo(() => ({ isMobile }), [isMobile]);

  return (
    <LayoutContext.Provider value={state}>
      <ConnectivityDetector
        render={({ online }) => (
          <>
            <OfflineNotification isOnline={online} isMobile={isMobile} />
            {children}
          </>
        )}
      />
    </LayoutContext.Provider>
  );
};

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useLayout = () => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('useLayout must be used within LayoutProvider');
  }

  return { ...context };
};

export { LayoutProvider, useLayout };
