import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FloatButton from '../../UI/FloatButton';

const LinkButton = ({ to, theme, children, ...props }) => (
  <Link to={to} {...props}>
    <FloatButton theme={theme}>{children}</FloatButton>
  </Link>
);

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  theme: FloatButton.propTypes.theme.isRequired,
  children: PropTypes.node.isRequired,
};

export default LinkButton;
