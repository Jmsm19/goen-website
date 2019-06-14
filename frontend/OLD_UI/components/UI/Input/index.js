import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import StyledInput from './styles';

const Input = ({ type, name, className, flat, validationStatus, disabled, onChange, ...props }) => {
  const localClassNames = classnames(
    ['input'],
    {
      flat: !!flat,
      success: validationStatus === 'success',
      error: validationStatus === 'error',
      disabled: !!disabled,
    },
    [className],
  );

  return (
    <StyledInput
      type={type}
      name={name}
      className={localClassNames}
      disabled={disabled}
      onChange={onChange}
      {...props}
    />
  );
};

Input.defaultProps = {
  className: '',
  disabled: false,
  flat: false,
  type: 'text',
  validationStatus: null,
};

Input.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  flat: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  validationStatus: PropTypes.oneOf(['success', 'error', null]),
};

export default Input;
