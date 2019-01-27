import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Icon } from 'antd';
import { InstitutionContextConsumer } from '../../../context/InstitutionContext';
import {
  StyledNoBorderMenu,
  StyledMenuItem,
} from '../../../styles/components/dashboard/DashboardMenu';

function StudentMenu({ t, handlePageChange, currentPage, hasClass }) {
  const { SubMenu } = Menu;
  return (
    <InstitutionContextConsumer>
      {({ registrationActive }) => (
        <StyledNoBorderMenu
          mode='inline'
          onClick={({ key }) => handlePageChange(key)}
          defaultOpenKeys={['student']}
          selectedKeys={[currentPage]}
        >
          <SubMenu
            key='student'
            title={<span className='submenu-title-wrapper'>{t('Student')}</span>}
          >
            {registrationActive && (
              <StyledMenuItem key='dashboard-student-registration'>
                <Icon type='user-add' />
                <Link href='/dashboard/student/registration'>
                  <a>{t('ModuleRegister')}</a>
                </Link>
              </StyledMenuItem>
            )}
            {hasClass && (
              <StyledMenuItem key='dashboard-student-payments'>
                <Icon type='team' />
                <Link href='/dashboard/student/payments'>
                  <a>{t('MyClass')}</a>
                </Link>
              </StyledMenuItem>
            )}
          </SubMenu>
        </StyledNoBorderMenu>
      )}
    </InstitutionContextConsumer>
  );
}

StudentMenu.propTypes = {
  t: PropTypes.func.isRequired,
  hasClass: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default StudentMenu;
