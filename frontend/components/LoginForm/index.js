import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import {  Form, Icon, Input, Checkbox, Button } from 'antd';
import { hasErrors } from '../../utils/formValidation';

export const LoginForm = ({ t, handleLogin }) => {
  const initialState = {
    email: '',
    password: '',
    remember_me: false
  };

  const ValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('InvalidEmail'))
      .required(t('Required')),
    password: Yup.string()
      .required(t('Required'))
  });

  const Label = Form.Item;

  return (
    <Formik
      initialValues={initialState}
      validationSchema={ValidationSchema}
      onSubmit={handleLogin}>
      {({ handleSubmit, isSubmitting, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          <Label htmlFor="login_email" label={t('Email')}
            validateStatus={hasErrors('email', errors, touched) ? 'error' : 'success'}
            help={hasErrors('email', errors, touched) ? errors.email : ''}>
            <Field name="email"
              render={({ field }) => (
                <Input {...field} type="email"
                  autoComplete="username" id="login_email"
                  placeholder="ejemplo@email.com"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}
                  />} />
              )} />
          </Label>

          <Label htmlFor="login_password" label={t('Password')}
            validateStatus={hasErrors('password', errors, touched) ? 'error' : 'success'}
            help={errors.password && touched.password ? errors.password : ''}>
            <Field name="password"
              render={({ field }) => (
                <Input {...field} type="password"
                  autoComplete="current-password" id="login_password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                  />} />
              )} />
          </Label>

          <div style={{ marginBottom: '20px' }}>
            <Checkbox name="remember_me">{t('RememberMe')}</Checkbox>
          </div>

          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            {t('Login')}
          </Button>

          <div style={{ marginTop: '20px' }}>
            <Link href="/register">
              <a>{t('Register')}</a>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  )
}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
}

export default LoginForm

