import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../store/context/AuthContext';
import useForm from '../../../hooks/useForm';

import Input from '../../UI/Input';
import Button from '../../UI/Button';
import FormField from '../FormField';

import { LoginFormSetup } from '../../../lib/validation';
import StyledForm from './styles';

const LoginForm = () => {
  const { t } = useTranslation();
  const { login, isLoggingIn } = useAuth();
  const { initialValues, validate } = LoginFormSetup;
  const { values, errors, handleChange, handleSubmit } = useForm(login, validate, initialValues);

  return (
    <StyledForm className='login-form'>
      <div className='fields'>
        <FormField error={errors.email ? errors.email : ''}>
          <Input
            name='email'
            type='email'
            placeholder={t('Email')}
            value={values.email || ''}
            validationStatus={errors.email ? 'error' : null}
            onChange={handleChange}
          />
        </FormField>

        <FormField error={errors.password ? errors.password : ''}>
          <Input
            name='password'
            type='password'
            placeholder={t('Password')}
            value={values.password || ''}
            validationStatus={errors.password ? 'error' : null}
            onChange={handleChange}
          />
        </FormField>
      </div>

      <Button
        fullWidth
        text={t('Enter')}
        type='submit'
        variant='primary'
        onClick={handleSubmit}
        isLoading={isLoggingIn}
      />
    </StyledForm>
  );
};

export default LoginForm;
