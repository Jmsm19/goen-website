/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import {  Form, Icon, Input, Button } from 'antd';
import { Formik, Field } from 'formik';
import WithAuthentication from '../WithAuthentication';
import { validateEmail,
  validatePassword,
  validateTextField,
  validatePhoneNumber,
  validateBirthDateField,
  hasErrors
} from '../../utils/formValidation';

const RegisterForm = ({ t }) => {
  const initialState = {
    name: '',
    birth_date: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const Label = Form.Item;

  return (
    <WithAuthentication>
      {({handlePasswordConfirmation, handleRegister, fieldErrors}) => (
        <Formik
          initialValues={initialState}
          validate={handlePasswordConfirmation}
          onSubmit={handleRegister}>
          {({ handleSubmit, isSubmitting, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              {/* Name */}
              <Label htmlFor="register_name" label={t('Name')}
                validateStatus={hasErrors('name', errors, touched) ? 'error' : 'success'}
                help={hasErrors('name', errors, touched) ? errors.name : ''}>
                <Field name="name" validate={validateTextField}
                  render={({ field }) => (
                    <Input {...field} type="text" id="register_name"
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}
                      />} />
                  )} />
              </Label>

              {/* Birth date */}
              <Label htmlFor="register_birth_date" label={t('BirthDate')}
                validateStatus={hasErrors('birth_date', errors, touched) ?  'error' : 'success'}
                help={hasErrors('birth_date', errors, touched) ? errors.birth_date : ''}>
                <Field name="birth_date" validate={validateBirthDateField}
                  render={({ field }) => (
                    <Input {...field} type="date" id="register_birth_date"
                      prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }}
                      />} />
                  )} />
              </Label>

              {/* Phone number */}
              <Label htmlFor="register_phone_number" label={t('PhoneNumber')}
                validateStatus={hasErrors('phone_number', errors, touched) ?  'error' : 'success'}
                help={hasErrors('phone_number', errors, touched) ? errors.phone_number : ''}>
                <Field name="phone_number" validate={validatePhoneNumber}
                  render={({ field }) => (
                    <Input {...field} type="tel" id="register_phone_number"
                      placeholder="0424-1234567"
                      prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}
                      />} />
                  )} />
              </Label>

              {/* Email */}
              <Label htmlFor="register_email" label={t('Email')}
                validateStatus={
                  hasErrors('email', errors, touched, fieldErrors) ?  'error' : 'success'
                }
                help={hasErrors('email', errors, touched) ? errors.email : ''}>
                <Field name="email" validate={validateEmail}
                  render={({ field }) => (
                    <Input {...field} type="email" id="register_email"
                      autoComplete="username"
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}
                      />} />
                  )} />
              </Label>

              {/* Password */}
              <Label htmlFor="register_password" label={t('Password')}
                validateStatus={hasErrors('password', errors, touched) ?  'error' : 'success'}
                help={hasErrors('password', errors, touched) ? errors.password : ''}>
                <Field name="password" validate={validatePassword}
                  render={({ field }) => (
                    <Input {...field} type="password" id="register_password"
                      autoComplete="new-password"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                      />} />
                  )} />
              </Label>

              {/* Password confirmation */}
              <Label htmlFor="register_password_confirmation"
                label={t('PasswordConfirmation')}
                validateStatus={
                  hasErrors('password_confirmation', errors, touched) ?  'error' : 'success'
                }
                help={
                  hasErrors('password_confirmation', errors, touched) ?
                    errors.password_confirmation : ''
                }>
                <Field name="password_confirmation" validate={validatePassword}
                  render={({ field }) => (
                    <Input {...field} type="password" id="register_password_confirmation"
                      prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                      />} />
                  )} />
              </Label>

              {/* Submit */}
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                {t('Register')}
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </WithAuthentication>
  )
}

RegisterForm.propTypes = {
  t: PropTypes.func.isRequired,
}

export default RegisterForm;