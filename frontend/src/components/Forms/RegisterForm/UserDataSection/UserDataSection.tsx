import React from 'react';
import { useTranslation } from 'react-i18next';

import Input from '../../../UI/Input';
import FormField from '../../FormField';

import { UseFormPropType } from '../../../../lib/validation/propTypesValues';

const UserDataSection: React.FC<RegisterFormSectionProps> = ({ form }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange } = form;

  return (
    <section className='fields user-data-section'>
      <h1>{t('AccountInfo')}</h1>
      <FormField error={errors.email ? errors.email : ''}>
        <Input
          name='email'
          type='email'
          placeholder={t('Email')}
          title={t('Email')}
          autoComplete='username'
          onChange={handleChange}
          value={values.email || ''}
        />
      </FormField>
      <FormField error={errors.password ? errors.password : ''}>
        <Input
          name='password'
          type='password'
          placeholder={t('Password')}
          title={t('Password')}
          autoComplete='new-password'
          onChange={handleChange}
          value={values.password || ''}
        />
      </FormField>
      <FormField error={errors.password_confirmation ? errors.password_confirmation : ''}>
        <Input
          name='password_confirmation'
          type='password'
          placeholder={t('PasswordConfirmation')}
          title={t('PasswordConfirmation')}
          autoComplete='off'
          onChange={handleChange}
          value={values.password_confirmation || ''}
        />
      </FormField>
    </section>
  );
};

UserDataSection.propTypes = {
  form: UseFormPropType.isRequired,
};

export default UserDataSection;
