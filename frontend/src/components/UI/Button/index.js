import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledButton from './styles';

const Button = forwardRef((props, ref) => {
  const { text, type, htmlType, outline, className, onClick, fullWidth, ...rest } = props;
  const localClassNames = classnames(
    ['btn', outline ? `btn-outline-${type}` : `btn-${type}`, className],
    {
      'btn-block': fullWidth,
    },
  );

  return (
    <StyledButton ref={ref} className={localClassNames} type={htmlType} onClick={onClick} {...rest}>
      {text}
    </StyledButton>
  );
});

Button.defaultProps = {
  className: '',
  fullWidth: false,
  htmlType: 'button',
  onClick: () => null,
  outline: false,
  type: 'primary',
};

Button.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  htmlType: PropTypes.string,
  onClick: PropTypes.func,
  outline: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
};

export default Button;
