import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledButton from './styles';

const Button = forwardRef((props, ref) => {
  const {
    text,
    type,
    htmlType,
    outline,
    className,
    onClick,
    fullWidth,
    icon,
    iconPosition,
    ...rest
  } = props;
  const localClassNames = classnames(
    ['btn', outline ? `btn-outline-${type}` : `btn-${type}`, className],
    {
      'btn-block': fullWidth,
    },
  );

  return (
    <StyledButton ref={ref} className={localClassNames} type={htmlType} onClick={onClick} {...rest}>
      {!!icon && iconPosition === 'start' && icon}
      {text}
      {!!icon && iconPosition === 'end' && icon}
    </StyledButton>
  );
});

Button.defaultProps = {
  className: '',
  fullWidth: false,
  htmlType: 'button',
  icon: null,
  iconPosition: 'start',
  onClick: () => null,
  outline: false,
  text: '',
  type: 'primary',
};

Button.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  htmlType: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  onClick: PropTypes.func,
  outline: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
};

export default Button;
