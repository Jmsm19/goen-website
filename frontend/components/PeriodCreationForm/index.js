import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Checkbox } from 'antd';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import { hasErrors } from '../../utils/formValidation';
import StyledForm from '../../styles/components/PeriodCreationForm';
import { StyledFaintIcon } from '../../styles/pages/GeneralStyles';

function PeriodCreationForm({ t, createPeriod, togglePeriodCreationModal }) {
  const initialState = {
    signup_from: '',
    signup_until: '',
    make_current: false,
  };

  const ValidationSchema = Yup.object().shape({
    signup_from: Yup.date().required(t('Required')),
    signup_until: Yup.date()
      .when('signup_from', (st, _) => {
        const dayAfter = moment(st)
          .add(1, 'days')
          .toDate();
        return Yup.date().min(dayAfter, t('MustBeAfterSignupFrom'));
      })
      .required(t('Required')),
  });

  const Label = Form.Item;
  return (
    <Formik
      initialValues={initialState}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        createPeriod(values, { setSubmitting }, togglePeriodCreationModal);
      }}
    >
      {({ handleSubmit, isSubmitting, errors, touched }) => (
        <StyledForm onSubmit={handleSubmit}>
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

          <Field
            name='make_current'
            render={({ field }) => <Checkbox {...field}>{t('CreateAsCurrentPeriod')}</Checkbox>}
          />

          {/* Submit */}
          <div className='button-area'>
            <Button type='primary' htmlType='submit' loading={isSubmitting}>
              {t('Create')}
            </Button>
          </div>
        </StyledForm>
      )}
    </Formik>
  );
}

PeriodCreationForm.propTypes = {
  t: PropTypes.func.isRequired,
  createPeriod: PropTypes.func.isRequired,
  togglePeriodCreationModal: PropTypes.func.isRequired,
};

export default PeriodCreationForm;
