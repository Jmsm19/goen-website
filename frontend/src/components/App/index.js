import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import '../../i18n';

import Loading from '../Loading';
import { AuthContextProvider } from '../../context/AuthContext';
import { DataContextProvider } from '../../context/DataContext';

import routes from '../../lib/config/routes';
import { LayoutContextProvider } from '../../context/LayoutContext';

const DashboardLayout = lazy(() => import('../Layouts/DashboardLayout'));
const PlainLayout = lazy(() => import('../Layouts/PlainLayout'));

const App = () => (
  <LayoutContextProvider>
    <AuthContextProvider>
      <DataContextProvider>
        <BrowserRouter>
          <Suspense fallback={<Loading text='Loading Dashboard...' />}>
            <Switch>
              <Route
                path={routes.dashboard.prefix}
                render={rProps => <DashboardLayout {...rProps} />}
              />

              <Suspense fallback={<Loading />}>
                <Route path={routes.home} render={rProps => <PlainLayout {...rProps} />} />
              </Suspense>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </DataContextProvider>
    </AuthContextProvider>
  </LayoutContextProvider>
);

export default App;
