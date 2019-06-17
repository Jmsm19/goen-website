import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import '../../i18n';

import { useSettings } from '../../store/context/SettingsContext';
import { useAuth } from '../../store/context/AuthContext';
import { LayoutProvider } from '../../store/context/LayoutContext';

import Loading from '../Loading';

import routes from '../../lib/config/routes';

const DashboardLayout = React.lazy(() => import('../Layouts/DashboardLayout'));
const PlainLayout = React.lazy(() => import('../Layouts/PlainLayout'));

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
    <React.Suspense fallback={<Loading />}>
      <LayoutProvider>
        <BrowserRouter>
          <React.Suspense fallback={<Loading text='Loading Dashboard...' />}>
            <Switch>
              <Route
                path={routes.dashboard.prefix}
                render={rProps => <DashboardLayout {...rProps} />}
              />

              <React.Suspense fallback={<Loading />}>
                <Route path={routes.home} render={() => <PlainLayout />} />
              </React.Suspense>
            </Switch>
          </React.Suspense>
        </BrowserRouter>
      </LayoutProvider>
    </React.Suspense>
  );
};

export default App;
