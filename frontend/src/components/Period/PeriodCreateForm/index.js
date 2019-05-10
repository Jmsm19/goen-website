import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useFormal from '@kevinwolf/formal-web';

import { LayoutContext } from '../../../context/LayoutContext';
import FormField from '../../Form/Field';
import Button from '../../UI/Button';

import { getPeriodFormValidation } from '../../../lib/validation/forms';
import StyledForm from './styles';

const PeriodCreateForm = ({ onSubmit, onCancel }) => {
  const { t } = useTranslation();
  const { isMobile } = useContext(LayoutContext);

  const { initialValues, schema } = getPeriodFormValidation(t);

  const formalConfig = { schema, onSubmit };
  const formal = useFormal(initialValues, formalConfig);
  const { getSubmitButtonProps, getFieldProps, submit, reset } = formal;

  return (
    <StyledForm className='period-create-form' isMobile={isMobile}>
      <div className='form-fields'>
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

      <div className='button-area'>
        <Button
          {...getSubmitButtonProps()}
          type='primary'
          text={t('Create')}
          onClick={submit}
          fullWidth={isMobile}
        />
        <Button
          outline
          type='secondary'
          text={t('Cancel')}
          onClick={() => {
            reset();
            onCancel();
          }}
          fullWidth={isMobile}
        />
      </div>
    </StyledForm>
  );
};

PeriodCreateForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default PeriodCreateForm;
