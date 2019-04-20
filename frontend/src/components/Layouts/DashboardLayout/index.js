import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../context/AuthContext';

import routes from '../../../lib/config/routes';
import Loading from '../../Loading';

import TopNavigation from './TopNavigation';
import DashboardMain from './DashboardMain';
import DashboardSidebar from './DashboardSidebar';

import { StyledLayout } from './styles';

const DashboardLayout = ({ isMobile, location }) => {
  const { t } = useTranslation();
  const { isAuth, authUser, logout } = useContext(AuthContext);
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
    <StyledLayout className='dashboard-layout'>
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

        <DashboardMain location={location} authUser={authUser} />
      </div>
    </StyledLayout>
  );
};

DashboardLayout.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DashboardLayout;
