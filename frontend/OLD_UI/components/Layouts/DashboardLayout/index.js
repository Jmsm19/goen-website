import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CssBaseline, Hidden } from '@material-ui/core';

import { useAuth } from '../../../store/context/AuthContext';
import { PeriodsProvider } from '../../../store/context/PeriodsContext';
import { ModulesProvider } from '../../../store/context/ModulesContext';
import { UsersProvider } from '../../../store/context/UsersContext';
import useLayoutContext from '../../../hooks/useLayoutContext';

import Loading from '../../Loading';
import TopNavigation from './TopNavigation';
import DashboardMain from './DashboardMain';

import routes from '../../../lib/config/routes';
import { useLayoutStyles } from './styles';
import DashboardSidebarMenu from './DashboardSidebarMenu';
import DesktopDrawer from '../../Drawers/DesktopDrawer';
import MobileDrawer from '../../Drawers/MobileDrawer';
import useDrawerStyles from '../../Drawers/styles';

const DashboardLayout = ({ location }) => {
  const { t } = useTranslation();
  const { isAuth, authUser, logout } = useAuth();
  const { isMobile } = useLayoutContext();
  const classes = useLayoutStyles({ isMobile });
  const drawerClasses = useDrawerStyles();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  if (!isAuth) {
    return <Redirect to={routes.login} />;
  }

  if (!authUser) {
    return <Loading text='Loading user data...' />;
  }

  return (
    <div className={`dashboard-layout ${classes.root}`}>
      <CssBaseline />
      <TopNavigation t={t} routes={routes} toggleSidebar={toggleSidebar} logoutUser={logout} />
      <div className={drawerClasses.toolbar} />

      {/* <div className='inner-layout'> */}
      <Hidden mdUp implementation='css'>
        <MobileDrawer isOpen={isSidebarOpen} onClose={toggleSidebar}>
          <DashboardSidebarMenu toggleOpen={toggleSidebar} />
        </MobileDrawer>
      </Hidden>

      <Hidden smDown implementation='css'>
        <DesktopDrawer>
          <DashboardSidebarMenu toggleOpen={toggleSidebar} />
        </DesktopDrawer>
      </Hidden>

      <PeriodsProvider>
        <ModulesProvider>
          <UsersProvider>
            <DashboardMain location={location} authUser={authUser} />
          </UsersProvider>
        </ModulesProvider>
      </PeriodsProvider>
      {/* </div> */}
    </div>
  );
};

DashboardLayout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DashboardLayout;
