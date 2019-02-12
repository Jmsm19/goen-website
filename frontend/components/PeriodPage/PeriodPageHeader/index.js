import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import StyledHeaderCard from '../../../styles/components/PeriodPageHeader';

function PeriodPageHeader({
  t,
  currentPeriod,
  togglePeriodCreationModal,
  togglePeriodUpdateModal,
  toggleListModal,
  getPeriodList,
  modules,
}) {
  return (
    <StyledHeaderCard title={`${t('Period')} ${currentPeriod.name} - ${currentPeriod.year}`}>
      <Button type='dashed' onClick={togglePeriodUpdateModal}>
        <Icon type='edit' />
      </Button>
      <Button type='primary' onClick={togglePeriodCreationModal}>
        {t('CreateNewPeriod')}
      </Button>
      <Button
        type='default'
        onClick={() => {
          if (modules.length === 0) {
            getPeriodList();
          }
          toggleListModal();
        }}
      >
        {t('ChangeCurrentPeriod')}
      </Button>
    </StyledHeaderCard>
  );
}

PeriodPageHeader.propTypes = {
  t: PropTypes.func.isRequired,
  currentPeriod: PropTypes.shape({
    name: PropTypes.string,
    year: PropTypes.number,
    signupFrom: PropTypes.string,
    signupUntil: PropTypes.string,
  }).isRequired,
  togglePeriodCreationModal: PropTypes.func.isRequired,
  togglePeriodUpdateModal: PropTypes.func.isRequired,
  toggleListModal: PropTypes.func.isRequired,
  getPeriodList: PropTypes.func.isRequired,
  modules: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default PeriodPageHeader;
