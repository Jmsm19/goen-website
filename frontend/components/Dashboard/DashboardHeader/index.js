import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu } from 'antd';
import { withNamespaces } from '../../../i18n';
import {
  StyledHeader,
  StyledHeaderMenuItem,
  StyledHeaderHamburgerIcon,
} from '../../../styles/components/dashboard/DashboardHeader';

function DashboardHeader({ t, isMobile, currentPage, handlePageChange }) {
  return (
    <StyledHeader>
      <Menu
        mode='horizontal'
        selectedKeys={[currentPage]}
        onClick={({ key }) => handlePageChange(key)}
      >
        <StyledHeaderMenuItem key=''>
          <Link href='/'>
            <a>{t('Home')}</a>
          </Link>
        </StyledHeaderMenuItem>
        {isMobile && <StyledHeaderHamburgerIcon type='menu' />}
      </Menu>
    </StyledHeader>
  );
}

DashboardHeader.propTypes = {
  t: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default withNamespaces('common')(DashboardHeader);
