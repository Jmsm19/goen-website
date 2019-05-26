import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledIcon from './styles';

const LoadingIcon = ({ size, className, ...props }) => {
  const localClassName = classnames(['spinner', className]);
  return <StyledIcon size={size} className={localClassName} {...props} />;
};

LoadingIcon.defaultProps = {
  className: null,
  size: 80,
};

LoadingIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default LoadingIcon;
