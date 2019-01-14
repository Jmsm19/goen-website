import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Checkbox, Button } from 'antd';
import { hasErrors } from '../../utils/formValidation';
import { StyledButtonArea } from '../../styles/components/LoginForm';
import { StyledInput } from '../../styles/components/Forms';

const LoginForm = ({ t, handleLogin }) => {
  const initialState = {
    email: '',
    password: '',
    remember_me: false,
  };

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('InvalidEmail'))
      .required(t('Required')),
    password: Yup.string().required(t('Required')),
  });

  const Label = Form.Item;

  return (
    <Formik initialValues={initialState} validationSchema={ValidationSchema} onSubmit={handleLogin}>
      {({ handleSubmit, isSubmitting, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Label
            htmlFor='login_email'
            label={t('Email')}
            validateStatus={hasErrors('email', errors, touched) ? 'error' : 'success'}
            help={hasErrors('email', errors, touched) ? errors.email : ''}
          >
            <Field
              name='email'
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type='email'
                  autoComplete='username'
                  id='login_email'
                  placeholder='ejemplo@email.com'
                  prefix={<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              )}
            />
          </Label>

          <Label
            htmlFor='login_password'
            label={t('Password')}
            validateStatus={hasErrors('password', errors, touched) ? 'error' : 'success'}
            help={errors.password && touched.password ? errors.password : ''}
          >
            <Field
              name='password'
              render={({ field }) => (
                <StyledInput
                  {...field}
                  type='password'
                  autoComplete='current-password'
                  id='login_password'
                  prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              )}
            />
          </Label>

          <Checkbox name='remember_me'>{t('RememberMe')}</Checkbox>

          <StyledButtonArea>
            <Button type='primary' htmlType='submit' loading={isSubmitting}>
              {t('Login')}
            </Button>

            <Link href='/signup'>
              <Button type='ghost' style={{ border: 'none', color: 'var(--light-primary-color)' }}>
                {t('Register')}
              </Button>
            </Link>
          </StyledButtonArea>
        </Form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
};

export default LoginForm;
