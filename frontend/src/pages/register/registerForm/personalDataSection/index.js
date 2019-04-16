import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import FormField from '../../../../components/Form/Field';

import StyledSection from './styles';

const PersonalDataSection = forwardRef((props, ref) => {
  const { formal, t } = props;
  const { getFieldProps } = formal;

  return (
    <StyledSection ref={ref} className='fields personal-data-section'>
      <h1>{t('PersonalInfo')}</h1>
      <FormField
        {...getFieldProps('nationalId')}
        name='nationalId'
        type='string'
        placeholder={t('NationalId')}
        inputMode='numeric'
        title={t('NationalId')}
        help={t('NationalIdFormat')}
        autoFocus={!formal.values.nationalId}
      />
      <FormField
        {...getFieldProps('name')}
        name='name'
        type='text'
        placeholder={t('Name')}
        title={t('Name')}
        help={t('NameUsedInCertificateWarning')}
      />
      <FormField
        {...getFieldProps('birthDate')}
        name='birthDate'
        type='date'
        placeholder={t('BirthDate')}
        title={t('BirthDate')}
        help={t('BirthDate')}
      />
      <FormField
        {...getFieldProps('phoneNumber')}
        name='phoneNumber'
        type='tel'
        placeholder={t('PhoneNumber')}
        title={t('PhoneNumber')}
        help={t('PhoneFormat')}
      />
    </StyledSection>
  );
});

PersonalDataSection.propTypes = {
  t: PropTypes.func.isRequired,
  formal: PropTypes.shape({
    getFieldProps: PropTypes.func.isRequired,
  }).isRequired,
};

export default PersonalDataSection;
