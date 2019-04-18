import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../../context/AuthContext';

import Loading from '../../Loading';
import DashboardHomePage from '../../../pages/dashboard/home';
import Sidebar from '../../Navigation/Sidebar';
import Button from '../../UI/Button';

import StyledLayout from './styles';

import routes from '../../../lib/config/routes';
import AdminRoutes from '../RoutesSections/AdminRoutes';
import InstructorRoutes from '../RoutesSections/InstructorRoutes';
import StudentRoutes from '../RoutesSections/StudentRoutes';

const DashboardLayout = ({ isMobile }) => {
  const { t } = useTranslation();
  const { isAuth, getAuthUser, authUser } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const delayedToggleSidebar = () => {
    setTimeout(() => {
      toggleSidebar();
    }, 100);
  };

  useEffect(() => {
    if (isAuth) {
      getAuthUser();
    }
  }, []);

  if (!isAuth) {
    return <Redirect to={routes.login} />;
  }

  if (!authUser) {
    return <Loading text='Loading user data...' />;
  }

  return (
    <StyledLayout className='dashboard-layout'>
      <nav className='top-navigation'>
        <h1>GOEN Maracaibo</h1>

        <div>{isMobile && <Button text='Open' type='secondary' onClick={toggleSidebar} />}</div>
      </nav>

      <div className='inner-layout'>
        <Sidebar isMobile={isMobile} isOpen={isSidebarOpen} toggleOpen={toggleSidebar}>
          <AdminRoutes t={t} onLinkClick={delayedToggleSidebar} />
          <InstructorRoutes t={t} onLinkClick={delayedToggleSidebar} />
          <StudentRoutes t={t} onLinkClick={delayedToggleSidebar} />
        </Sidebar>

        <main className='main-content'>
          <Switch>
            <Route exact path={routes.dashboard.home} component={DashboardHomePage} />
          </Switch>
        </main>
      </div>
    </StyledLayout>
  );
};

DashboardLayout.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

export default DashboardLayout;
