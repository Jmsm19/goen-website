import React, { useState, useLayoutEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { enquireScreen, StopEnquireScreen } from '../../lib/utils/enquire';

import '../../i18n';

import Loading from '../Loading';
import { AuthContextProvider } from '../../context/AuthContext';

const DashboardLayout = lazy(() => import('../Layouts/DashboardLayout'));
const PlainLayout = lazy(() => import('../Layouts/PlainLayout'));

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    enquireScreen(isMob => {
      setIsMobile(!!isMob);
    });

    return StopEnquireScreen();
  });

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading text='Loading Dashboard...' />}>
          <Switch>
            <Route exact path='/dashboard' render={rProps => <DashboardLayout {...rProps} />} />

            <Suspense fallback={<Loading />}>
              <Route path='/' render={rProps => <PlainLayout {...rProps} />} />
            </Suspense>
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
