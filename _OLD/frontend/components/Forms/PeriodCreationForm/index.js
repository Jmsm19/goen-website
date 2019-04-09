import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from 'antd';
import { Formik, Field } from 'formik';
import StyledForm from '../../../styles/components/PeriodCreationForm';
import PeriodFormInputs from '../../Inputs/PeriodFormInputs';
import { periodFormValidation } from '../../../utils/formValidation';

function PeriodCreationForm({ t, createPeriod, togglePeriodCreationModal }) {
  const initialState = {
    signup_from: '',
    signup_until: '',
    make_current: false,
  };

  const ValidationSchema = periodFormValidation(t);

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
          <PeriodFormInputs t={t} errors={errors} touched={touched} />

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
