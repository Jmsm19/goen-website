import React from 'react';
import PropTypes from 'prop-types';
import Footer from '../Footer';
import NavigationMenu from '../NavigationMenu';
import {
  StyledHeader,
  StyledLayout,
  StyledMain,
  StyledContent,
} from '../../styles/components/DesktopLayout';

/* isAuth props if removed from component by styled-components
      as it's just required for styling */
const DesktopLayout = ({ children, isAuth, isMobile }) => (
  <StyledLayout isAuth={isAuth}>
    {isAuth && (
      <header>
        <StyledHeader>
          <NavigationMenu isMobile={isMobile} />
        </StyledHeader>
      </header>
    )}
    {/* isAuth props if removed from component by styled-components */}
    <StyledMain isAuth={isAuth}>
      <StyledContent isAuth={isAuth} isMobile={isMobile}>
        {children}
      </StyledContent>
    </StyledMain>
    <Footer />
  </StyledLayout>
);

DesktopLayout.defaultProps = {
  children: [],
};

DesktopLayout.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  children: PropTypes.node,
  isMobile: PropTypes.bool.isRequired,
};

export default DesktopLayout;
