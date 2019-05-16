import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import classnames from 'classnames';

import StyledSelect from './styles';
import LoadingOverlay from '../../LoadingOverlay';

const Select = ({ name, loading, options, onChange, defaultSelected, className, ...props }) => {
  const selectorClassNames = classnames(['selector', className]);

  const defaultValue = defaultSelected || undefined;

  const [selected, setSelected] = useState(defaultValue);

  const handleChange = ({ target: { value } }) => {
    setSelected(value);
    onChange(value);
  };

  const renderOptions = () => {
    if (!loading) {
      return [{ text: '--', value: undefined }, ...options].map(({ text, value, disabled }) => (
        <option className='selector-option' key={uuid()} value={value} disabled={!!disabled}>
          {text}
        </option>
      ));
    }
    return [];
  };

  return (
    <LoadingOverlay loading={loading}>
      <StyledSelect
        name={name}
        className={selectorClassNames}
        value={selected}
        onChange={handleChange}
        {...props}
      >
        {renderOptions()}
      </StyledSelect>
    </LoadingOverlay>
  );
};

Select.defaultProps = {
  className: null,
  defaultSelected: null,
  loading: false,
  options: [],
};

Select.propTypes = {
  className: PropTypes.string,
  defaultSelected: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
    }),
  ),
};

export default Select;
