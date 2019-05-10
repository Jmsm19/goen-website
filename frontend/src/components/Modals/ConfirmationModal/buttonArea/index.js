import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';

import Button from '../../../UI/Button';

const ButtonArea = ({ onAccept, onCancel, isMobile, className, ...props }) => {
  const { t } = useTranslation();
  return (
    <div className={classnames(['btn-area', className])} {...props}>
      <Button type='primary' text={t('Yes')} onClick={onAccept} fullWidth={isMobile} />
      <Button outline type='secondary' text={t('No')} onClick={onCancel} fullWidth={isMobile} />
    </div>
  );
};

ButtonArea.defaultProps = {
  className: null,
};

ButtonArea.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  onAccept: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ButtonArea;
