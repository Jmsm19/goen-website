import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { NavLink } from 'react-router-dom';

import StyledNavSection from './styles';

interface NavSectionProps {
  title: string;
  routes: {
    linkText: string;
    path: string;
  }[];
  onLinkClick?: () => void;
}

const NavSection: React.FC<NavSectionProps> = ({ title, routes, onLinkClick }) => {
  const routeLinks = routes.map(({ path, linkText }) => (
    <NavLink exact to={path} onClick={onLinkClick} key={uuid()}>
      {linkText}
    </NavLink>
  ));

  return (
    <StyledNavSection className='route-section'>
      <h3 className='section-title'>{title}</h3>
      <nav className='links'>{routeLinks}</nav>
    </StyledNavSection>
  );
};

NavSection.defaultProps = {
  onLinkClick: () => null,
};

NavSection.propTypes = {
  title: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      linkText: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onLinkClick: PropTypes.func,
};

export default NavSection;
