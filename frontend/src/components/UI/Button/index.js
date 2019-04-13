import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledButton from './styles';

const Button = ({ text, type, htmlType, outline, className, onClick, fullWidth }) => {
  const localClassNames = classnames(
    ['btn', outline ? `btn-outline-${type}` : `btn-${type}`, className],
    {
      'btn-block': fullWidth,
    },
  );

  return (
    <StyledButton className={localClassNames} type={htmlType} onClick={onClick}>
      {text}
    </StyledButton>
  );
};

Button.defaultProps = {
  className: '',
  fullWidth: false,
  htmlType: 'button',
  outline: false,
  type: 'primary',
};

Button.propTypes = {
  className: PropTypes.string,
  fullWidth: PropTypes.bool,
  htmlType: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  outline: PropTypes.bool,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger', 'success', 'warning']),
};

export default Button;
