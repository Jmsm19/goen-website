import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledFloatButton from './styles';

const FloatButton = forwardRef((props, ref) => {
  const {
    children,
    theme,
    className,
    onClick,
    block,
    icon,
    type,
    iconPosition,
    disabled,
    ...rest
  } = props;
  const localClassNames = classnames(['float-btn', `float-btn-outline-${theme}`, className], {
    'float-btn-block': block,
  });

  return (
    <StyledFloatButton
      ref={ref}
      className={localClassNames}
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {!!icon && iconPosition === 'start' && icon}
      {children}
      {!!icon && iconPosition === 'end' && icon}
    </StyledFloatButton>
  );
});

FloatButton.defaultProps = {
  className: '',
  disabled: false,
  block: false,
  type: 'button',
  icon: null,
  iconPosition: 'start',
  onClick: () => null,
  theme: 'primary',
};

FloatButton.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  type: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
};

export default FloatButton;
