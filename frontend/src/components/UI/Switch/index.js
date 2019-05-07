import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { StyledSwitch, StyledBall } from './styles';
import usePreviousValue from '../../../hooks/usePreviousValue';

const Switch = ({ enabled, className, disabled, onChange }) => {
  const [isOn, setIsOn] = useState(enabled);
  const wasOn = usePreviousValue(isOn);
  const toggleSwitch = () => !disabled && setIsOn(!isOn);

  const switchClassNames = classnames(
    'switch',
    `switch-${isOn ? 'on' : 'off'}`,
    { disabled },
    className,
  );

  const ballClassNames = classnames('ball', `ball-${isOn ? 'right' : 'left'}`, { disabled });

  useEffect(() => {
    if (isOn !== wasOn && wasOn !== undefined) {
      onChange(isOn);
    }
  }, [isOn, wasOn]);

  return (
    <StyledSwitch
      className={switchClassNames}
      role='switch'
      aria-checked={isOn ? 'true' : 'false'}
      onClick={toggleSwitch}
      onKeyPress={() => null}
      disabled={disabled}
    >
      <StyledBall className={ballClassNames} />
    </StyledSwitch>
  );
};

Switch.defaultProps = {
  className: '',
  disabled: false,
  enabled: false,
};

Switch.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  enabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Switch;
