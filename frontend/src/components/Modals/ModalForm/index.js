import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useFormal from '@kevinwolf/formal-web';

import { Button } from 'shards-react';

import StyledForm from './styles';
import { callFunctions } from '../../../lib/utils';

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
    <StyledForm className='period-create-form'>
      <FormFieldsComponent formalInstance={formal} formType={formType} />

      <div className='button-area'>
        <Button {...getSubmitButtonProps()} theme='primary' onClick={submit} {...submitBtnProps}>
          {formType === 'create' ? t('Create') : t('Update')}
        </Button>
        <Button outline theme='secondary' onClick={() => callFunctions([reset, onCancel])}>
          {t('Cancel')}
        </Button>
      </div>
    </StyledForm>
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
