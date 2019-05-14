import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import FormField from '../../Form/Field';

import StyledFormFields from './styles';

const PeriodFormFields = ({ formalInstance }) => {
  const { t } = useTranslation();

  const { getFieldProps } = formalInstance;

  return (
    <StyledFormFields className='form-fields'>
      {getFieldProps('name').value && (
        <div className='name-year'>
          <FormField
            {...getFieldProps('name')}
            name='name'
            type='string'
            title={t('Period.Number')}
            help={t('Period.Number')}
          />
          <FormField
            {...getFieldProps('year')}
            name='year'
            type='string'
            title={t('Period.Year')}
            help={t('Period.Year')}
          />
        </div>
      )}
      <div className='date-fields'>
        <div>
          <FormField
            {...getFieldProps('signup_from')}
            name='signup_from'
            type='date'
            title={t('Period.SignupFrom')}
            help={t('Period.SignupFrom')}
          />
        </div>
        <div>
          <FormField
            {...getFieldProps('signup_until')}
            name='signup_until'
            type='date'
            title={t('Period.SignupUntil')}
            help={t('Period.SignupUntil')}
          />
        </div>
      </div>
    </StyledFormFields>
  );
};

PeriodFormFields.propTypes = {
  formalInstance: PropTypes.shape({
    getFieldProps: PropTypes.func,
  }).isRequired,
};

export default PeriodFormFields;
