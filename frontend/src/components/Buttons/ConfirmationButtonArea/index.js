import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shards-react';

import StyledButtonArea from './styles';

const ConfirmationButtonArea = ({ onYes, onNo, className, ...props }) => {
  const { t } = useTranslation();
  return (
    <StyledButtonArea className={classnames(['btn-area', className])} {...props}>
      <Button theme='primary' onClick={onYes} block>
        {t('Yes')}
      </Button>
      <Button outline theme='secondary' onClick={onNo} block>
        {t('No')}
      </Button>
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
