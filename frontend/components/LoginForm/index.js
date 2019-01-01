import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Formik, Field } from 'formik';
import {  Form, Icon, Input, Button } from 'antd';
import WithAuthentication from '../WithAuthentication';
import { hasErrors } from '../../utils/formValidation';

const LoginForm = ({ t }) => {
  const initialState = {
    email: '',
    password: ''
  };
  const Label = Form.Item;

  return (
    <WithAuthentication>
      {({ handleLogin }) => (
        <Formik
          initialValues={initialState}
          onSubmit={handleLogin}>
          {({ handleSubmit, isSubmitting, errors, touched }) => (
            <Form onSubmit={handleSubmit}>

              <Label htmlFor="login_email" label={t('Email')}>
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
                validateStatus={hasErrors('password', errors, touched) && 'error'}
                help={hasErrors('password', errors, touched) ? errors.password : ''}>
                <Field name="password"
                  render={({ field }) => (
                    <Input {...field} type="password"
                      autoComplete="current-password" id="login_password"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                      />} />
                  )} />
              </Label>

              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                {t('Login')}
              </Button>

              <br/>
              <br/>

              <div>
                <Link href="/register">
                  <a>{t('Register')}</a>
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </WithAuthentication>
  )}

LoginForm.propTypes = {
  t: PropTypes.func.isRequired,
}

export default LoginForm
