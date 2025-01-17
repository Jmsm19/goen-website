import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import classnames from 'classnames';

import StyledSelect from './styles';
import LoadingOverlay from '../../LoadingOverlay';

const Select: React.FC<SelectProps> = props => {
  const { name, loading, options, onChange, className, ...rest } = props;
  const selectorClassNames = classnames(['selector', className]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(event);
  };

  const renderOptions = () => {
    if (!loading) {
      const initialOptions: SelectOptions = [{ text: '--', value: undefined }, ...options];
      return initialOptions.map(({ text, value, disabled }) => (
        <option className='selector-option' key={uuid()} value={value} disabled={!!disabled}>
          {text}
        </option>
      ));
    }
    return [];
  };

  return (
    <LoadingOverlay loading={!!loading}>
      <StyledSelect name={name} className={selectorClassNames} onChange={handleChange} {...rest}>
        {renderOptions()}
      </StyledSelect>
    </LoadingOverlay>
  );
};

Select.defaultProps = {
  className: undefined,
  loading: false,
  options: [],
};

Select.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      disabled: PropTypes.bool,
    }).isRequired,
  ),
};

export default Select;
