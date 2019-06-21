import React from 'react';
import { useTranslation } from 'react-i18next';

import Input from '../../../UI/Input';
import FormField from '../../FormField';

import { UseFormPropType } from '../../../../lib/validation/propTypesValues';

const PersonalDataSection: React.FC<RegisterFormSectionProps> = ({ form }) => {
  const { t } = useTranslation();
  const { values, errors, handleChange } = form;

  return (
    <section className='fields personal-data-section'>
      <h1>{t('PersonalInfo')}</h1>
      <FormField help={t('NationalIdFormat')} error={errors.nationalId ? errors.nationalId : ''}>
        <Input
          name='nationalId'
          type='string'
          placeholder={t('NationalId')}
          inputMode='numeric'
          title={t('NationalId')}
          onChange={handleChange}
          value={values.nationalId || ''}
        />
      </FormField>
      <FormField help={t('NameUsedInCertificateWarning')} error={errors.name ? errors.name : ''}>
        <Input
          name='name'
          type='text'
          placeholder={t('Name')}
          title={t('Name')}
          onChange={handleChange}
          value={values.name || ''}
        />
      </FormField>
      <FormField help={t('BirthDate')} error={errors.birthDate ? errors.birthDate : ''}>
        <Input
          name='birthDate'
          type='date'
          placeholder={t('BirthDate')}
          title={t('BirthDate')}
          onChange={handleChange}
          value={values.birthDate || ''}
        />
      </FormField>
      <FormField help={t('PhoneFormat')} error={errors.phoneNumber ? errors.phoneNumber : ''}>
        <Input
          name='phoneNumber'
          type='tel'
          placeholder={t('PhoneNumber')}
          title={t('PhoneNumber')}
          onChange={handleChange}
          value={values.phoneNumber || ''}
        />
      </FormField>
    </section>
  );
};

PersonalDataSection.propTypes = {
  form: UseFormPropType.isRequired,
};

export default PersonalDataSection;
