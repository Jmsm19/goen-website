import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledBadge from './styles';

const Badge = ({ type, className, children }) => {
  const badgeClass = classnames(['badge', type, className]);
  return <StyledBadge className={badgeClass}>{children}</StyledBadge>;
};

Badge.defaultProps = {
  className: null,
};

Badge.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'success', 'danger', 'info', 'warning']).isRequired,
};

export default Badge;
