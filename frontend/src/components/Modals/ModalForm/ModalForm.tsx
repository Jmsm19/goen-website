import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Button from '../../UI/Button';

import { StyledForm, StyledDialogActions } from './styles';
import useForm from '../../../hooks/useForm';

interface Props {
  initialValues: {};
  validationFunc: Function;
  submitBtnProps?: {
    disabled: boolean;
  };
  onSubmit: Function;
  onCancel: BtnClick;
  formFields: any;
  formType?: 'create' | 'update';
}

const ModalForm: React.FC<Props> = ({
  initialValues,
  validationFunc,
  submitBtnProps,
  onSubmit,
  onCancel,
  formFields: FormFieldsComponent,
  formType,
}) => {
  const { t } = useTranslation();

  const { handleSubmit, handleChange, values, errors } = useForm(
    onSubmit,
    validationFunc,
    initialValues,
  );

  return (
    <>
      <StyledForm className='modal-form'>
        <FormFieldsComponent
          values={values}
          errors={errors}
          handleChange={handleChange}
          formType={formType}
        />
      </StyledForm>

      <StyledDialogActions className='button-area'>
        <Button
          fullWidth
          variant='primary'
          text={formType === 'create' ? t('Create') : t('Update')}
          onClick={handleSubmit}
          {...submitBtnProps}
        />
        <Button outline fullWidth variant='secondary' text={t('Cancel')} onClick={onCancel} />
      </StyledDialogActions>
    </>
  );
};

ModalForm.defaultProps = {
  formType: 'create',
  submitBtnProps: {
    disabled: false,
  },
};

ModalForm.propTypes = {
  initialValues: PropTypes.shape({}).isRequired,
  validationFunc: PropTypes.func.isRequired,
  formFields: PropTypes.func.isRequired,
  formType: PropTypes.oneOf(['create', 'update']),
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitBtnProps: PropTypes.shape({
    disabled: PropTypes.bool.isRequired,
  }),
};

export default ModalForm;
