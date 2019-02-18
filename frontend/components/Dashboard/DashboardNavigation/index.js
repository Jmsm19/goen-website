import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { Icon } from 'antd';
import DashboardMenuUser from '../DashboardMenuUser';
import AdminMenu from '../AdminMenu';
import StudentMenu from '../StudentMenu';
import {
  StyledNoBorderMenu,
  StyledMenuItem,
} from '../../../styles/components/dashboard/DashboardMenu';
import { setActiveLinkClass } from '../../../utils/styling';

function DashboardNavigation({
  t,
  router,
  isMobile,
  authUser,
  currentPage,
  handlePageChange,
  handleLogout,
}) {
  return (
    <>
      <h1 style={{ padding: '10px 0 0 15px' }}>GOEN MARACAIBO</h1>

      {!isMobile && <DashboardMenuUser user={authUser} />}

      {authUser && authUser.isAdmin && (
        <AdminMenu
          t={t}
          router={router}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}

      {authUser && authUser.isStudent && (
        <StudentMenu
          t={t}
          router={router}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          hasClass={authUser.registrationStatus === 'registered'}
        />
      )}

      <StyledNoBorderMenu
        mode='inline'
        selectedKeys={[currentPage]}
        onClick={({ key }) =>
          handlePageChange(key, {
            logout: handleLogout,
          })
        }
      >
        <StyledMenuItem
          key='dashboard-settings'
          className={setActiveLinkClass('/dashboard/settings', router)}
        >
          <Icon type='setting' />
          <Link href='/dashboard/settings'>
            <a>{t('Settings')}</a>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem key='logout'>
          <Icon type='user' />
          {t('Logout')}
        </StyledMenuItem>
      </StyledNoBorderMenu>
    </>
  );
}

DashboardNavigation.propTypes = {
  t: PropTypes.func.isRequired,
  router: PropTypes.shape().isRequired,
  isMobile: PropTypes.bool.isRequired,
  authUser: PropTypes.shape().isRequired,
  currentPage: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default withRouter(DashboardNavigation);
