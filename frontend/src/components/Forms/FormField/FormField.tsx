import React from 'react';
import PropTypes from 'prop-types';

// import { SlideDownErrorText, FadeInHelpText } from './animations';
import ErrorText from '../ErrorText';
import HelpText from '../HelpText';
import StyledFormField from './styles';
import SpringAnimation from '../../Animations/SpringAnimation';

interface FormFieldProps {
  children: React.ReactNode;
  error?: string;
  help?: string;
}

const FormField: React.FC<FormFieldProps> = ({ children, error, help }) => {
  return (
    <StyledFormField className='form-field'>
      {children}

      {error ? (
        <SpringAnimation animation='slideDown'>
          <ErrorText key='error-field' error={error} />
        </SpringAnimation>
      ) : (
        help && (
          <SpringAnimation animation='fadeIn'>
            <HelpText key='help-field' text={help} />
          </SpringAnimation>
        )
      )}
    </StyledFormField>
  );
};

FormField.defaultProps = {
  error: '',
  help: '',
};

FormField.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
  help: PropTypes.string,
};

export default FormField;
