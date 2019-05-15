import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../context/AuthContext';
import { PeriodsProvider } from '../../../context/PeriodsContext';
import { ModulesProvider } from '../../../context/ModulesContext';
import { UsersProvider } from '../../../context/UsersContext';
import useLayoutContext from '../../../hooks/useLayoutContext';

import Loading from '../../Loading';
import TopNavigation from './TopNavigation';
import DashboardMain from './DashboardMain';
import DashboardSidebar from './DashboardSidebar';

import routes from '../../../lib/config/routes';
import { StyledLayout } from './styles';

const DashboardLayout = ({ location }) => {
  const { t } = useTranslation();
  const { isAuth, authUser, logout } = useAuth();
  const { isMobile } = useLayoutContext();

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
    <StyledLayout className='dashboard-layout' isMobile={isMobile}>
      <TopNavigation
        t={t}
        routes={routes}
        isMobile={isMobile}
        toggleSidebar={toggleSidebar}
        logoutUser={logout}
      />

      <div className='inner-layout'>
        <DashboardSidebar
          t={t}
          logoutUser={logout}
          isMobile={isMobile}
          authUser={authUser}
          isSidebarOpen={isSidebarOpen}
          toggleOpen={toggleSidebar}
        />

        <PeriodsProvider>
          <ModulesProvider>
            <UsersProvider>
              <DashboardMain location={location} authUser={authUser} />
            </UsersProvider>
          </ModulesProvider>
        </PeriodsProvider>
      </div>
    </StyledLayout>
  );
};

DashboardLayout.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DashboardLayout;
