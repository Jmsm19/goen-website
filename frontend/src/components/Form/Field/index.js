import React from 'react';
import PropTypes from 'prop-types';
import { PoseGroup } from 'react-pose';

import Input from '../../UI/Input';
import HelpText from '../HelpText';

import SlideDownErrorField from './animations';
import StyledFormField from './styles';

const FormField = ({ type, error, help, ...props }) => (
  <StyledFormField className='form-field'>
    <Input type={type} validationStatus={error ? 'error' : null} {...props} />
    <PoseGroup>
      {error ? (
        <SlideDownErrorField key='error-field' error={error} />
      ) : (
        help && <HelpText key='help-field' text={help} />
      )}
    </PoseGroup>
  </StyledFormField>
);

FormField.defaultProps = {
  error: '',
  help: '',
};

FormField.propTypes = {
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  help: PropTypes.string,
};

export default FormField;
