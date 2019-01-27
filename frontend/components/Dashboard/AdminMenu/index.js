import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Icon } from 'antd';
import {
  StyledMenuItem,
  StyledNoBorderMenu,
} from '../../../styles/components/dashboard/DashboardMenu';

function AdminMenu({ t, handlePageChange, currentPage }) {
  const { SubMenu } = Menu;
  return (
    <StyledNoBorderMenu
      mode='inline'
      onClick={({ key }) => handlePageChange(key)}
      defaultOpenKeys={['admin']}
      selectedKeys={[currentPage]}
    >
      <SubMenu key='admin' title={<span className='submenu-title-wrapper'>{t('Admin')}</span>}>
        <StyledMenuItem key='dashboard-admin-period'>
          <Icon type='calendar' />
          <Link href='/dashboard/admin/period'>
            <a>{t('Period')}</a>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem key='dashboard-admin-modules'>
          <Icon type='team' />
          <Link href='/dashboard/admin/modules'>
            <a>{t('Modules')}</a>
          </Link>
        </StyledMenuItem>
        <StyledMenuItem key='dashboard-admin-payments'>
          <Icon type='credit-card' />
          <Link href='/dashboard/admin/payments'>
            <a>{t('Payments')}</a>
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
};

export default AdminMenu;
