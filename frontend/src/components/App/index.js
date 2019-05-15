import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import '../../i18n';

import { useSettings } from '../../context/SettingsContext';
import { useAuth } from '../../context/AuthContext';
import { LayoutContextProvider } from '../../context/LayoutContext';

import Loading from '../Loading';

import routes from '../../lib/config/routes';

const DashboardLayout = lazy(() => import('../Layouts/DashboardLayout'));
const PlainLayout = lazy(() => import('../Layouts/PlainLayout'));

const App = () => {
  const { isAuth, authUser, getAuthUser } = useAuth();
  const { settings, getSettings } = useSettings();

  React.useEffect(() => {
    if (!settings) {
      getSettings();
    } else if (isAuth && !authUser) {
      getAuthUser();
    }
  }, [authUser, getAuthUser, getSettings, isAuth, settings]);

  if (!settings) {
    return <Loading text='Loading config...' />;
  }

  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

export default App;
