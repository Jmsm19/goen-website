import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

import { usePeriods } from '../../../store/context/PeriodsContext';

import Modal from '../../UI/Modal';
import ModalForm from '../ModalForm';
import PeriodFormFields from '../../Period/PeriodFormFields';

import { PeriodPropType } from '../../../lib/validation/propTypesValues';
import { UpdatePeriodFormSetup } from '../../../lib/validation';

interface Props {
  isVisible: boolean;
  onClose: BtnClick;
  period: Period;
}

const UpdatePeriodModal: React.FC<Props> = ({ isVisible, onClose, period, ...props }) => {
  const { t } = useTranslation();
  const { updatePeriod } = usePeriods();
  const handleSubmit = (values: {}) => updatePeriod(period.id, values, onClose);

  const { name, year, signupFrom, signupUntil } = period;
  const initialValues = React.useMemo(
    () => ({
      name,
      year,
      signup_from: format(signupFrom, 'YYYY-MM-DD'),
      signup_until: format(signupUntil, 'YYYY-MM-DD'),
    }),
    [name, signupFrom, signupUntil, year],
  );

  const { validate } = UpdatePeriodFormSetup;

  return (
    <Modal
      title={t('Period.Update')}
      isVisible={isVisible}
      onClose={onClose}
      animation='slideDown'
      {...props}
    >
      <ModalForm
        initialValues={initialValues}
        validationFunc={validate}
        onSubmit={handleSubmit}
        submitBtnProps={{ disabled: false }}
        onCancel={onClose}
        formFields={PeriodFormFields}
        formType='update'
      />
    </Modal>
  );
};

UpdatePeriodModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  period: PeriodPropType.isRequired,
};

export default UpdatePeriodModal;
