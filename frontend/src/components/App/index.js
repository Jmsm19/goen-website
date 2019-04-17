import React, { useState, useLayoutEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { enquireScreen, StopEnquireScreen } from '../../lib/utils/enquire';

import '../../i18n';

import Loading from '../Loading';
import { AuthContextProvider } from '../../context/AuthContext';

import routes from '../../lib/config/routes';

const DashboardLayout = lazy(() => import('../Layouts/DashboardLayout'));
const PlainLayout = lazy(() => import('../Layouts/PlainLayout'));

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    enquireScreen(isMob => {
      setIsMobile(!!isMob);
    });

    return () => StopEnquireScreen();
  });

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading text='Loading Dashboard...' />}>
          <Switch>
            <Route
              path={routes.dashboard.prefix}
              render={rProps => <DashboardLayout isMobile={isMobile} {...rProps} />}
            />

            <Suspense fallback={<Loading />}>
              <Route path={routes.home} render={rProps => <PlainLayout {...rProps} />} />
            </Suspense>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
