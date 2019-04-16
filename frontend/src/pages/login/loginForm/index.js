import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useFormal from '@kevinwolf/formal-web';

import FormField from '../../../components/Form/Field';
import Button from '../../../components/UI/Button';

import { AuthContext } from '../../../context/AuthContext';
import { getLoginValidationProps } from '../../../lib/validation/forms';

import StyledForm from './styles';

const LoginForm = ({ t }) => {
  const { login } = useContext(AuthContext);

  const { initialValues, schema } = getLoginValidationProps(t);

  const formalConfig = { schema, onSubmit: login };
  const formal = useFormal(initialValues, formalConfig);
  const { getFormProps, getFieldProps, getSubmitButtonProps, submit, reset } = formal;

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

      <Button
        {...getSubmitButtonProps()}
        fullWidth
        text={t('Enter')}
        htmlType='submit'
        type='primary'
        onClick={submit}
      />
    </StyledForm>
  );
};

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default LoginForm;
