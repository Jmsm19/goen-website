import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import FormField from '../../Forms/FormField';
import Input from '../../UI/Input';

interface Props extends UseFormResult {
  formType?: 'update' | 'create';
}

const PeriodFormFields: React.FC<Props> = ({ handleChange, values, errors, formType }) => {
  const { t } = useTranslation();

  return (
    <div className='form-fields'>
      {formType === 'update' && (
        <div className='name-year'>
          <FormField help={t('Period.Number')} error={errors.name}>
            <Input
              name='name'
              type='text'
              title={t('Period.Number')}
              onChange={handleChange}
              value={values.name}
            />
          </FormField>
          <FormField help={t('Period.Year')} error={errors.year}>
            <Input
              name='year'
              type='text'
              title={t('Period.Year')}
              onChange={handleChange}
              value={values.year}
            />
          </FormField>
        </div>
      )}
      <div className='date-fields'>
        <div>
          <FormField help={t('Period.SignupFrom')} error={errors.signup_from}>
            <Input
              name='signup_from'
              type='date'
              title={t('Period.SignupFrom')}
              onChange={handleChange}
              value={values.signup_from}
            />
          </FormField>
        </div>
        <div>
          <FormField help={t('Period.SignupUntil')} error={errors.signup_until}>
            <Input
              name='signup_until'
              type='date'
              title={t('Period.SignupUntil')}
              onChange={handleChange}
              value={values.signup_until}
            />
          </FormField>
        </div>
      </div>
    </div>
  );
};

PeriodFormFields.defaultProps = {
  formType: 'create',
};

PeriodFormFields.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({}).isRequired,
  errors: PropTypes.shape({}).isRequired,
  formType: PropTypes.oneOf(['create', 'update']),
};

export default PeriodFormFields;
