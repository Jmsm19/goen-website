import React from 'react';
import PropTypes from 'prop-types';
import { Input, Form } from 'antd';
import { Field } from 'formik';
import { StyledFaintIcon } from '../../styles/pages/GeneralStyles';
import { hasErrors } from '../../utils/formValidation';

function PeriodFormInputs({ t, errors, touched }) {
  const Label = Form.Item;
  return (
    <>
      <div className='input-area'>
        {/* Signup from */}
        <Label
          htmlFor='signup_from'
          label={t('PeriodSignupFrom')}
          validateStatus={hasErrors('signup_from', errors, touched) ? 'error' : 'success'}
          help={hasErrors('signup_from', errors, touched) && errors.signup_from}
        >
          <Field
            name='signup_from'
            render={({ field }) => (
              <Input
                {...field}
                type='date'
                id='signup_from'
                prefix={<StyledFaintIcon type='calendar' />}
              />
            )}
          />
        </Label>

        {/* Signup until */}
        <Label
          htmlFor='signup_until'
          label={t('PeriodSignupUntil')}
          validateStatus={hasErrors('signup_until', errors, touched) ? 'error' : 'success'}
          help={hasErrors('signup_until', errors, touched) && errors.signup_until}
        >
          <Field
            name='signup_until'
            render={({ field }) => (
              <Input
                {...field}
                type='date'
                id='signup_until'
                prefix={<StyledFaintIcon type='calendar' />}
              />
            )}
          />
        </Label>
      </div>
    </>
  );
}

PeriodFormInputs.propTypes = {
  t: PropTypes.func.isRequired,
  errors: PropTypes.shape().isRequired,
  touched: PropTypes.shape().isRequired,
};

export default PeriodFormInputs;
