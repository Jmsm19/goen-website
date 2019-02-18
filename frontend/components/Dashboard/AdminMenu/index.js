import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Icon } from 'antd';
import {
  StyledMenuItem,
  StyledNoBorderMenu,
} from '../../../styles/components/dashboard/DashboardMenu';
import { setActiveLinkClass } from '../../../utils/styling';

function AdminMenu({ t, handlePageChange, currentPage, router }) {
  const { SubMenu } = Menu;

  return (
    <StyledNoBorderMenu
      mode='inline'
      onClick={({ key }) => handlePageChange(key)}
      defaultOpenKeys={['admin']}
      selectedKeys={[currentPage]}
    >
      <SubMenu key='admin' title={<span className='submenu-title-wrapper'>{t('Admin')}</span>}>
        <StyledMenuItem
          key='dashboard-admin-payments'
          className={setActiveLinkClass('/dashboard/admin/payments', router)}
        >
          <Icon type='credit-card' />
          <Link href='/dashboard/admin/payments'>
            <a>{t('Payments')}</a>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem
          key='dashboard-admin-period'
          className={setActiveLinkClass('/dashboard/admin/period', router)}
        >
          <Icon type='calendar' />
          <Link href='/dashboard/admin/period'>
            <a>{t('Period')}</a>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem
          key='dashboard-admin-instructors'
          className={setActiveLinkClass('/dashboard/admin/instructors', router)}
        >
          <Icon type='team' />
          <Link href='/dashboard/admin/instructors'>
            <a>{t('Instructors')}</a>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem
          key='dashboard-admin-modules'
          className={setActiveLinkClass('/dashboard/admin/modules', router)}
        >
          <Icon type='team' />
          <Link href='/dashboard/admin/modules'>
            <a>{t('Modules')}</a>
          </Link>
        </StyledMenuItem>
      </SubMenu>
    </StyledNoBorderMenu>
  );
}

AdminMenu.propTypes = {
  t: PropTypes.func.isRequired,
  currentPage: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
  router: PropTypes.shape().isRequired,
};

export default AdminMenu;
