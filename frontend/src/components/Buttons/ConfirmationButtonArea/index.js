import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import Button from '../../UI/Button';

import StyledButtonArea from './styles';

const ConfirmationButtonArea = ({ onYes, onNo, className, ...props }) => {
  const { t } = useTranslation();

  return (
    <StyledButtonArea className={classnames(['btn-area', className])} {...props}>
      <Button type='primary' text={t('Yes')} onClick={onYes} fullWidth />
      <Button outline type='secondary' text={t('No')} onClick={onNo} fullWidth />
    </StyledButtonArea>
  );
};

ConfirmationButtonArea.defaultProps = {
  className: null,
};

ConfirmationButtonArea.propTypes = {
  className: PropTypes.string,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired,
};

export default ConfirmationButtonArea;
