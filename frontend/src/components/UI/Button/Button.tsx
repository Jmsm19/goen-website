import React, { forwardRef } from 'react';
import classnames from 'classnames';

import LoadingIcon from '../LoadingIcon';

import StyledButton from './styles';

const Button = forwardRef((props: ButtonProps, ref) => {
  const {
    text,
    variant,
    type,
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
    ['btn', outline ? `btn-outline-${variant}` : `btn-${variant}`, className],
    {
      'btn-block': fullWidth,
    },
  );

  return (
    <StyledButton
      ref={ref}
      className={localClassNames}
      type={type}
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
  type: 'button',
  icon: null,
  iconPosition: 'start',
  isLoading: false,
  outline: false,
  text: '',
  variant: 'primary',
};

export default Button;
