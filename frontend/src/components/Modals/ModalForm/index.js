import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useFormal from '@kevinwolf/formal-web';

import Button from '../../UI/Button';

import { StyledForm, StyledDialogActions } from './styles';

const ModalForm = ({
  initialValues,
  validationSchema,
  submitBtnProps,
  onSubmit,
  onCancel,
  formFields: FormFieldsComponent,
  formType,
}) => {
  const { t } = useTranslation();

  const formalConfig = { schema: validationSchema, onSubmit };
  const formal = useFormal(initialValues, formalConfig);
  const { getSubmitButtonProps, submit, reset } = formal;

  return (
    <>
      <StyledForm className='modal-form'>
        <FormFieldsComponent formalInstance={formal} formType={formType} />
      </StyledForm>

      <StyledDialogActions className='button-area'>
        <Button
          {...getSubmitButtonProps()}
          fullWidth
          type='primary'
          text={formType === 'create' ? t('Create') : t('Update')}
          onClick={submit}
          {...submitBtnProps}
        />
        <Button
          outline
          fullWidth
          type='secondary'
          text={t('Cancel')}
          onClick={() => {
            reset();
            onCancel();
          }}
        />
      </StyledDialogActions>
    </>
  );
};

ModalForm.defaultProps = {
  formType: 'create',
  submitBtnProps: {},
};

ModalForm.propTypes = {
  initialValues: PropTypes.shape().isRequired,
  validationSchema: PropTypes.shape().isRequired,
  formFields: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(['create', 'update']),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitBtnProps: PropTypes.shape({
    disabled: PropTypes.bool,
  }),
};

export default ModalForm;
