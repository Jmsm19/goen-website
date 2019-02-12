import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { hasErrors } from '../../../utils/formValidation';
import { StyledButtonArea, StyledForm } from '../../../styles/components/UserProfileEditionForm';
import { StyledFaintIcon } from '../../../styles/pages/GeneralStyles';

function UserProfileEditionForm({ t, updateUser, user, fieldErrors }) {
  const Label = Form.Item;

  const initialState = {
    name: user.name,
    birth_date: user.birthDate.split(' ')[0],
    phone_number: user.phoneNumber,
    email: user.email,
  };

  const MINIMUM_AGE = 14;
  const MINIMUM_DATE = new Date(
    moment()
      .subtract(MINIMUM_AGE, 'y')
      .format('YYYY-MM-DD'),
  );

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required(t('Required')),
    phone_number: Yup.string()
      .matches(/^[0-9]{3,4}-[0-9]{7}$/i, { message: t('WrongPhoneFormat') })
      .required(t('Required')),
    birth_date: Yup.date()
      .max(MINIMUM_DATE, t('Underage', { age: MINIMUM_AGE }))
      .required(t('Required')),
    email: Yup.string()
      .email(t('InvalidEmail'))
      .required(t('Required')),
  });

  return (
    <Formik
      initialValues={initialState}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) => updateUser(values, { setSubmitting })}
    >
      {({ handleSubmit, isSubmitting, errors, touched }) => (
        <StyledForm onSubmit={handleSubmit}>
          <div className='input-area'>
            {/* Name */}
            <Label
              htmlFor='user_name'
              label={t('Name')}
              extra={t('NameUsedInCertificateWarning')}
              validateStatus={hasErrors('name', errors, touched) ? 'error' : 'success'}
              help={hasErrors('name', errors, touched) && errors.name}
            >
              <Field
                name='name'
                render={({ field }) => (
                  <Input
                    {...field}
                    type='text'
                    id='user_name'
                    prefix={<StyledFaintIcon type='user' />}
                  />
                )}
              />
            </Label>

            {/* Birth date */}
            <Label
              htmlFor='user_birth_date'
              label={t('BirthDate')}
              validateStatus={hasErrors('birth_date', errors, touched) ? 'error' : 'success'}
              help={hasErrors('birth_date', errors, touched) && errors.birth_date}
            >
              <Field
                name='birth_date'
                render={({ field }) => (
                  <Input
                    {...field}
                    type='date'
                    id='user_birth_date'
                    prefix={<StyledFaintIcon type='calendar' />}
                  />
                )}
              />
            </Label>

            {/* Phone number */}
            <Label
              htmlFor='user_phone_number'
              label={t('PhoneNumber')}
              validateStatus={hasErrors('phone_number', errors, touched) ? 'error' : 'success'}
              help={hasErrors('phone_number', errors, touched) && errors.phone_number}
            >
              <Field
                name='phone_number'
                render={({ field }) => (
                  <Input
                    {...field}
                    type='tel'
                    id='user_phone_number'
                    placeholder='0424-1234567'
                    prefix={<StyledFaintIcon type='phone' />}
                  />
                )}
              />
            </Label>

            {/* Email */}
            {/* <Label
              htmlFor='user_email'
              label={t('Email')}
              validateStatus={
                hasErrors('email', errors, touched, fieldErrors) ? 'error' : 'success'
              }
              help={hasErrors('email', errors, touched) && errors.email}
            >
              <Field
                name='email'
                render={({ field }) => (
                  <Input
                    {...field}
                    type='email'
                    id='user_email'
                    autoComplete='username'
                    disabled
                    prefix={<StyledFaintIcon type='mail' />}
                  />
                )}
              />
            </Label> */}
          </div>

          {/* Submit */}
          <StyledButtonArea>
            <Button
              type='primary'
              htmlType='submit'
              loading={isSubmitting}
              disabled={!touched.birth_date && !touched.name && !touched.phone_number}
            >
              {t('SaveChanges')}
            </Button>
          </StyledButtonArea>
        </StyledForm>
      )}
    </Formik>
  );
}

UserProfileEditionForm.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserProfileEditionForm;
