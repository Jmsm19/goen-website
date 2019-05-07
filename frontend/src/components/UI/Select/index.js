import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import classnames from 'classnames';

import StyledSelect from './styles';

const Select = ({ name, options, onChange, defaultSelected, className, ...props }) => {
  const selectorClassNames = classnames(['selector', className]);

  const defaultValue = defaultSelected || options[0].value;

  const [selected, setSelected] = useState(defaultValue);

  const handleChange = ({ target: { value } }) => {
    setSelected(value);
    onChange(value);
  };

  const renderOptions = () =>
    options.map(({ text, value, disabled }) => (
      <option className='selector-option' key={uuid()} value={value} disabled={!!disabled}>
        {text}
      </option>
    ));

  return (
    <StyledSelect
      name={name}
      className={selectorClassNames}
      value={selected}
      onChange={handleChange}
      {...props}
    >
      {renderOptions()}
    </StyledSelect>
  );
};

Select.defaultProps = {
  className: null,
  defaultSelected: null,
};

Select.propTypes = {
  className: PropTypes.string,
  defaultSelected: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    }),
  ).isRequired,
};

export default Select;
