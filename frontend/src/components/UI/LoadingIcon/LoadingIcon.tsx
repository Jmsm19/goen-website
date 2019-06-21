import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledIcon from './styles';

interface Props {
  size?: number;
  className?: string;
}

const LoadingIcon: React.FC<Props> = ({ size, className, ...props }) => {
  const localClassName = classnames(['spinner', className]);

  return <StyledIcon size={size} className={localClassName} {...props} />;
};

LoadingIcon.defaultProps = {
  size: 80,
  className: undefined,
};

LoadingIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number,
};

export default LoadingIcon;
