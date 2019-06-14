import React from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';

import Input from '../../UI/Input';

import { SlideDownErrorText, FadeInHelpText } from './animations';
import StyledFormField from './styles';

const FormField = ({ type, selectComponent: SelectComponent, error, help, ...props }) => (
  <StyledFormField className='form-field'>
    {type === 'select' ? (
      <SelectComponent validationStatus={error ? 'error' : null} {...props} />
    ) : (
      <Input type={type} validationStatus={error ? 'error' : null} {...props} />
    )}
    <PoseGroup>
      {error ? (
        <SlideDownErrorText key='error-field' error={error} />
      ) : (
        help && <FadeInHelpText key='help-field' text={help} />
      )}
    </PoseGroup>
  </StyledFormField>
);

FormField.defaultProps = {
  error: '',
  help: '',
  value: undefined,
  selectComponent: null,
};

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  selectComponent: PropTypes.func,
  error: PropTypes.string,
  help: PropTypes.string,
  value: PropTypes.string,
};

export default FormField;
