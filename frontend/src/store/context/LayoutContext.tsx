import * as React from 'react';
import PropTypes from 'prop-types';
import { Detector as ConnectivityDetector } from 'react-detect-offline';

import { enquireScreen, StopEnquireScreen } from '../../lib/utils/enquire';
import OfflineNotification from '../../components/OfflineNotification';

type State = {
  isMobile: boolean
}

const LayoutContext = React.createContext<State | undefined>(undefined);

const LayoutProvider = ({ children }: ProviderProps) => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useLayoutEffect(() => {
    enquireScreen((isMob: boolean | undefined) => setIsMobile(!!isMob));

    return () => StopEnquireScreen();
  });

  const state = React.useMemo(() => ({ isMobile }), [isMobile]);

  return (
    <LayoutContext.Provider value={state} >
      <ConnectivityDetector
        render={
          ({ online }: { online: boolean }) => (
            <>
              <OfflineNotification isOnline={online} />
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

const useLayoutContext = () => {
  const context = React.useContext(LayoutContext);

  if (!context) {
    throw new Error('useAuth must be used within LayoutProvider');
  }

  return context;
};

export { LayoutProvider, useLayoutContext };
