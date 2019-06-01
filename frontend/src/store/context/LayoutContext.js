import React from 'react';
import PropTypes from 'prop-types';
import { Detector as ConnectivityDetector } from 'react-detect-offline';

import { enquireScreen, StopEnquireScreen } from '../../lib/utils/enquire';
import OfflineNotification from '../../components/OfflineNotification';

const LayoutContext = React.createContext();

const LayoutContextProvider = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useLayoutEffect(() => {
    enquireScreen(isMob => setIsMobile(!!isMob));

    return () => StopEnquireScreen();
  });

  const state = React.useMemo(() => ({ isMobile }), [isMobile]);

  return (
    <LayoutContext.Provider value={state}>
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
