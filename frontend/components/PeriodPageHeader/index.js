import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Icon } from 'antd';

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
    <Card>
      <h1>
        {t('Period')} {currentPeriod.name} - {currentPeriod.year}
      </h1>
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
    </Card>
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
