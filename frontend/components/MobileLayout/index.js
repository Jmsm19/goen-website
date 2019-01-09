import React from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';
import { StyledLayout, StyledContent, StyledMain } from '../../styles/components/MobileLayout';
import SidebarNavigation from '../Sidebar';
import Footer from '../Footer';

/* isAuth props if removed from component by styled-components
    as it's just required for styling */
const MobileLayout = ({ children, isAuth, isMobile }) => (
  <Row style={{ height: '100vh' }}>
    {isAuth && <SidebarNavigation isAuth={isAuth} isMobile={isMobile} />}
    <StyledLayout>
      <StyledMain isAuth={isAuth}>
        <StyledContent>{children}</StyledContent>
      </StyledMain>
      <Footer>Copyright and shit</Footer>
    </StyledLayout>
  </Row>
);

MobileLayout.defaultProps = {
  children: [],
};

MobileLayout.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node,
  isMobile: PropTypes.bool.isRequired,
};

export default MobileLayout;
