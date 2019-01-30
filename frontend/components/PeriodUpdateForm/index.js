import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button } from 'antd';
import PeriodFormInputs from '../PeriodFormInputs';
import StyledForm from '../../styles/components/PeriodCreationForm';
import { periodFormValidation } from '../../utils/formValidation';

function PeriodUpdateForm({ t, period, updatePeriod, afterSubmit }) {
  const ValidationSchema = periodFormValidation(t);

  return (
    <Formik
      initialValues={{
        signup_from: period.signupFrom,
        signup_until: period.signupUntil,
      }}
      validationSchema={ValidationSchema}
      onSubmit={(values, { setSubmitting }) =>
        updatePeriod(period.id, values, { setSubmitting }, afterSubmit)
      }
    >
      {({ handleSubmit, isSubmitting, errors, touched }) => (
        <StyledForm onSubmit={handleSubmit}>
          {/* Inputs */}
          <PeriodFormInputs t={t} errors={errors} touched={touched} />

          {/* Submit */}
          <div className='button-area'>
            <Button type='primary' htmlType='submit' loading={isSubmitting}>
              {t('Update')}
            </Button>
          </div>
        </StyledForm>
      )}
    </Formik>
  );
}

PeriodUpdateForm.propTypes = {
  t: PropTypes.func.isRequired,
  updatePeriod: PropTypes.func.isRequired,
  afterSubmit: PropTypes.func.isRequired,
  period: PropTypes.shape({
    id: PropTypes.number,
    signupFrom: PropTypes.string,
    signupUntil: PropTypes.string,
  }).isRequired,
};

export default PeriodUpdateForm;
