import React from 'react';
import PropTypes from 'prop-types';
import useFormal from '@kevinwolf/formal-web';
import { Button } from 'shards-react';

import { useAuth } from '../../../store/context/AuthContext';

import FormField from '../../../components/Form/Field';
import LoadingIcon from '../../../components/UI/LoadingIcon';

import { getLoginValidationProps } from '../../../lib/validation/forms';

import StyledForm from './styles';

const LoginForm = ({ t }) => {
  const { login, isLoggingIn } = useAuth();

  const { initialValues, schema } = getLoginValidationProps(t);

  const formalConfig = { schema, onSubmit: login };
  const formal = useFormal(initialValues, formalConfig);
  const { getFormProps, getFieldProps, getSubmitButtonProps, submit } = formal;

  return (
    <StyledForm className='login-form' {...getFormProps()}>
      <div className='fields'>
        <FormField {...getFieldProps('email')} name='email' type='email' placeholder={t('Email')} />
        <FormField
          {...getFieldProps('password')}
          name='password'
          type='password'
          placeholder={t('Password')}
        />
      </div>

      <Button {...getSubmitButtonProps()} block theme='primary' onClick={submit} type='button'>
        {isLoggingIn ? <LoadingIcon size={18} style={{ color: '#FFF' }} /> : t('Enter')}
      </Button>
    </StyledForm>
  );
};

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default LoginForm;
