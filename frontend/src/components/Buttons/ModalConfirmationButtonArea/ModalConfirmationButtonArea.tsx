import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { DialogActions } from '@material-ui/core';
import { DialogActionsProps } from '@material-ui/core/DialogActions';

import Button from '../../UI/Button';

interface Props extends DialogActionsProps {
  onYes: BtnClick;
  onNo: BtnClick;
  className?: string;
}

const ModalConfirmationButtonArea: React.FC<Props> = ({ onYes, onNo, className, ...props }) => {
  const { t } = useTranslation();

  return (
    <DialogActions className={classnames(['btn-area', className])} {...props}>
      <Button text={t('Yes')} variant='primary' onClick={onYes} />
      <Button text={t('No')} outline variant='secondary' onClick={onNo} />
    </DialogActions>
  );
};

ModalConfirmationButtonArea.defaultProps = {
  className: undefined,
};

ModalConfirmationButtonArea.propTypes = {
  className: PropTypes.string,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
};

export default ModalConfirmationButtonArea;
