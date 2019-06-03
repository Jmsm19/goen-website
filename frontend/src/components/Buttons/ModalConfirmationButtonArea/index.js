import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { DialogActions } from '@material-ui/core';

import Button from '../../UI/Button';

const ModalConfirmationButtonArea = ({ onYes, onNo, className, ...props }) => {
  const { t } = useTranslation();

  return (
    <DialogActions className={classnames(['btn-area', className])} {...props}>
      <Button text={t('Yes')} type='primary' onClick={onYes} />
      <Button text={t('No')} outline type='secondary' onClick={onNo} />
    </DialogActions>
  );
};

ModalConfirmationButtonArea.defaultProps = {
  className: null,
};

ModalConfirmationButtonArea.propTypes = {
  className: PropTypes.string,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
};

export default ModalConfirmationButtonArea;
