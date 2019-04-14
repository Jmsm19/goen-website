import React from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';

import Input from '../../UI/Input';

import SlideDownErrorField from './animations';
import StyledFormField from './styles';

const FormField = ({ type, error, ...props }) => (
  <StyledFormField className='form-field'>
    <Input type={type} validationStatus={error ? 'error' : null} {...props} />
    <PoseGroup>{error && <SlideDownErrorField key='error-field' error={error} />}</PoseGroup>
  </StyledFormField>
);

FormField.defaultProps = {
  error: '',
};

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
};

export default FormField;
