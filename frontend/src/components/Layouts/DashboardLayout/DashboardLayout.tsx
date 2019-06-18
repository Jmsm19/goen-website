import React from 'react';
import { Redirect } from 'react-router-dom';
import { CssBaseline, Hidden } from '@material-ui/core';

import { useAuth } from '../../../store/context/AuthContext';
import { useLayoutContext } from '../../../store/context/LayoutContext';
import { PeriodsProvider } from '../../../store/context/PeriodsContext';
import { ModulesProvider } from '../../../store/context/ModulesContext';
import { UsersProvider } from '../../../store/context/UsersContext';

import Loading from '../../Loading';
import TopNavigation from './TopNavigation';
import DashboardMain from './DashboardMain';

import routes from '../../../lib/config/routes';
import { useLayoutStyles } from './styles';
import DashboardSidebarMenu from './DashboardSidebarMenu';
import DesktopDrawer from '../../Drawers/DesktopDrawer';
import MobileDrawer from '../../Drawers/MobileDrawer';
import useDrawerStyles from '../../Drawers/styles';

const DashboardLayout: React.FC = () => {
  const { isAuth, authUser, logout } = useAuth();
  const { isMobile } = useLayoutContext();
  const classes = useLayoutStyles({ isMobile });
  const drawerClasses = useDrawerStyles();

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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
      <TopNavigation toggleSidebar={toggleSidebar} logoutUser={logout} />
      <div className={drawerClasses.toolbar} />

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
            <DashboardMain />
          </UsersProvider>
        </ModulesProvider>
      </PeriodsProvider>
    </div>
  );
};

export default DashboardLayout;
