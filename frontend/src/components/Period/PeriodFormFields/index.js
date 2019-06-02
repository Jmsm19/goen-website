import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import FormField from '../../Form/Field';

const PeriodFormFields = ({ formalInstance, formType }) => {
  const { t } = useTranslation();

  const { getFieldProps } = formalInstance;

  return (
    <div className='form-fields'>
      {formType === 'update' && (
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
    </div>
  );
};

PeriodFormFields.defaultProps = {
  formType: 'create',
};

PeriodFormFields.propTypes = {
  formalInstance: PropTypes.shape({
    getFieldProps: PropTypes.func,
  }).isRequired,
  formType: PropTypes.oneOf(['create', 'update']),
};

export default PeriodFormFields;
