import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import LoadingIcon from '../LoadingIcon';

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
    isLoading,
    disabled,
    ...rest
  } = props;
  const localClassNames = classnames(
    ['btn', outline ? `btn-outline-${type}` : `btn-${type}`, className],
    {
      'btn-block': fullWidth,
    },
  );

  return (
    <StyledButton
      ref={ref}
      className={localClassNames}
      type={htmlType}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <div className='spinner-container'>
          <LoadingIcon size={20} />
        </div>
      ) : (
        <>
          {!!icon && iconPosition === 'start' && icon}
          {text}
          {!!icon && iconPosition === 'end' && icon}
        </>
      )}
    </StyledButton>
  );
});

Button.defaultProps = {
  className: '',
  disabled: false,
  fullWidth: false,
  htmlType: 'button',
  icon: null,
  iconPosition: 'start',
  isLoading: false,
  onClick: () => null,
  outline: false,
  text: '',
  type: 'primary',
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  fullWidth: PropTypes.bool,
  htmlType: PropTypes.string,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['start', 'end']),
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  outline: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
};

export default Button;
