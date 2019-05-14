import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useFormal from '@kevinwolf/formal-web';

import Button from '../../UI/Button';

import StyledForm from './styles';

const ModalForm = ({
  initialValues,
  validationSchema,
  submitBtnProps,
  onSubmit,
  onCancel,
  formFields: FormFieldsComponent,
}) => {
  const { t } = useTranslation();

  const formalConfig = { schema: validationSchema, onSubmit };
  const formal = useFormal(initialValues, formalConfig);
  const { getSubmitButtonProps, submit, reset } = formal;

  return (
    <StyledForm className='period-create-form'>
      <FormFieldsComponent formalInstance={formal} />

      <div className='button-area'>
        <Button
          {...getSubmitButtonProps()}
          type='primary'
          text={t('Create')}
          onClick={submit}
          {...submitBtnProps}
        />
        <Button
          outline
          type='secondary'
          text={t('Cancel')}
          onClick={() => {
            reset();
            onCancel();
          }}
        />
      </div>
    </StyledForm>
  );
};

ModalForm.defaultProps = {
  submitBtnProps: {},
};

ModalForm.propTypes = {
  initialValues: PropTypes.shape().isRequired,
  validationSchema: PropTypes.shape().isRequired,
  formFields: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitBtnProps: PropTypes.shape({
    disabled: PropTypes.bool,
  }),
};

export default ModalForm;
