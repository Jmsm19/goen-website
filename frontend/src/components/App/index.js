import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import '../../i18n';

import Loading from '../Loading';
import { AuthContextProvider } from '../../context/AuthContext';
import { DataContextProvider } from '../../context/DataContext';

import routes from '../../lib/config/routes';
import { LayoutContextProvider } from '../../context/LayoutContext';

const DashboardLayout = lazy(() => import('../Layouts/DashboardLayout'));
const PlainLayout = lazy(() => import('../Layouts/PlainLayout'));

const App = () => (
  <AuthContextProvider>
    <DataContextProvider>
      <LayoutContextProvider>
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

        <ToastContainer hideProgressBar />
      </LayoutContextProvider>
    </DataContextProvider>
  </AuthContextProvider>
);

export default App;
