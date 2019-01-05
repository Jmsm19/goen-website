/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import {  Form, Icon, Button } from 'antd';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { hasErrors } from '../../utils/formValidation';
import { StyledButtonArea } from '../../styles/components/RegisterForm';
import { StyledInput } from '../../styles/components/Forms';

const RegisterForm = ({ t, handleRegister, fieldErrors }) => {
  const initialState = {
    name: '',
    birth_date: '',
    phone_number: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  const PASSWORD_MIN_LENGTH = 6;
  const MINIMUM_AGE = 14;
  const MINIMUM_DATE = new Date(moment().subtract(MINIMUM_AGE, 'y').format('YYYY-MM-DD'));

  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('Required')),
    national_id: Yup.string()
      .matches(/^[0-9]{7,}$/i, { message: t('WrongNationalIdFormat') })
      .required(t('Required')),
    phone_number: Yup.string()
      .matches(/^[0-9]{4}-[0-9]{7}$/i, { message: t('WrongPhoneFormat') })
      .required(t('Required')),
    birth_date: Yup.date()
      .max(MINIMUM_DATE, t('Underage', {age: MINIMUM_AGE}))
      .required(t('Required')),
    email: Yup.string()
      .email(t('InvalidEmail'))
      .required(t('Required')),
    password: Yup.string()
      .min(PASSWORD_MIN_LENGTH, t('TooShort', { minimum: PASSWORD_MIN_LENGTH }))
      .required(t('Required')),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], t('PasswordNotEqual'))
      .required(t('Required'))
  });

  const Label = Form.Item;

  return (
    <Formik
      initialValues={initialState}
      validationSchema={ValidationSchema}
      onSubmit={handleRegister}>
      {({ handleSubmit, isSubmitting, errors, touched }) => (
        <Form onSubmit={handleSubmit}>
          {/* Name */}
          <Label htmlFor="register_name" label={t('Name')}
            extra={t('NameUsedInCertificateWarning')}
            validateStatus={hasErrors('name', errors, touched) ? 'error' : 'success'}
            help={hasErrors('name', errors, touched) ? errors.name : ''}>
            <Field name="name"
              render={({ field }) => (
                <StyledInput {...field} type="text" id="register_name"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}
                  />} />
              )} />
          </Label>

          {/* Natinal Id */}
          <Label htmlFor="register_national_id" label={t('NationalId')}
            validateStatus={
              hasErrors('national_id', errors, touched, fieldErrors) ? 'error' : 'success'
            }
            help={hasErrors('national_id', errors, touched) ? errors.national_id : ''}>
            <Field name="national_id"
              render={({ field }) => (
                <StyledInput {...field} type="text" inputMode="numeric"
                  id="register_national_id" placeholder="20123456"
                  prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }}
                  />} />
              )} />
          </Label>

          {/* Birth date */}
          <Label htmlFor="register_birth_date" label={t('BirthDate')}
            validateStatus={hasErrors('birth_date', errors, touched) ?  'error' : 'success'}
            help={hasErrors('birth_date', errors, touched) ? errors.birth_date : ''}>
            <Field name="birth_date"
              render={({ field }) => (
                <StyledInput {...field} type="date" id="register_birth_date"
                  prefix={<Icon type="calendar" style={{ color: 'rgba(0,0,0,.25)' }}
                  />} />
              )} />
          </Label>

          {/* Phone number */}
          <Label htmlFor="register_phone_number" label={t('PhoneNumber')}
            validateStatus={hasErrors('phone_number', errors, touched) ?  'error' : 'success'}
            help={hasErrors('phone_number', errors, touched) ? errors.phone_number : ''}>
            <Field name="phone_number"
              render={({ field }) => (
                <StyledInput {...field} type="tel" id="register_phone_number"
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
            <Field name="email"
              render={({ field }) => (
                <StyledInput {...field} type="email" id="register_email"
                  autoComplete="username"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}
                  />} />
              )} />
          </Label>

          {/* Password */}
          <Label htmlFor="register_password" label={t('Password')}
            validateStatus={hasErrors('password', errors, touched) ?  'error' : 'success'}
            help={hasErrors('password', errors, touched) ? errors.password : ''}>
            <Field name="password"
              render={({ field }) => (
                <StyledInput {...field} type="password" id="register_password"
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
            <Field name="password_confirmation"
              render={({ field }) => (
                <StyledInput {...field} type="password" autoComplete="off"
                  id="register_password_confirmation"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}
                  />} />
              )} />
          </Label>

          {/* Submit */}
          <StyledButtonArea>
            <Link href="/login">
              <Button type="ghost" style={{ border: 'none', color: 'var(--light-primary-color)' }}>
                <Icon type="arrow-left" />{t('Login')}
              </Button>
            </Link>
            <Button type="primary" htmlType="submit" loading={isSubmitting}>
              {t('Register')}
            </Button>
          </StyledButtonArea>
        </Form>
      )}
    </Formik>
  )
}

RegisterForm.propTypes = {
  t: PropTypes.func.isRequired,
}

export default RegisterForm;