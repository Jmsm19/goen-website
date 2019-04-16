import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import FormField from '../../../../components/Form/Field';

import StyledSection from '../personalDataSection/styles';

const UserDataSection = forwardRef((props, ref) => {
  const { formal, t } = props;
  const { getFieldProps } = formal;

  return (
    <StyledSection ref={ref} className='fields user-data-section'>
      <h1>{t('AccountInfo')}</h1>
      <FormField
        {...getFieldProps('email')}
        name='email'
        type='email'
        placeholder={t('Email')}
        title={t('Email')}
        autoComplete='username'
        autoFocus={!formal.values.email}
      />
      <FormField
        {...getFieldProps('password')}
        name='password'
        type='password'
        placeholder={t('Password')}
        title={t('Password')}
        autoComplete='new-password'
      />
      <FormField
        {...getFieldProps('password_confirmation')}
        name='password_confirmation'
        type='password'
        placeholder={t('PasswordConfirmation')}
        title={t('PasswordConfirmation')}
        autoComplete='off'
      />
    </StyledSection>
  );
});

UserDataSection.propTypes = {
  t: PropTypes.func.isRequired,
  formal: PropTypes.shape({
    getFieldProps: PropTypes.func.isRequired,
  }).isRequired,
};

export default UserDataSection;
