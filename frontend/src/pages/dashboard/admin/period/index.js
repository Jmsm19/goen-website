import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Loading from '../../../../components/Loading';
import PeriodSummary from './periodSummary';
import ModulesAvailable from './modulesAvailable';

import { DataContext } from '../../../../context/DataContext';

import StyledPage from './styles';

const AdminPeriodPage = props => {
  const { t } = useTranslation();
  const { activePeriod, getActivePeriod } = useContext(DataContext);

  useState(() => {
    if (!activePeriod) {
      getActivePeriod();
    }
  }, []);

  if (!activePeriod) {
    return <Loading />;
  }

  return (
    !!activePeriod && (
      <StyledPage className='dashboard-home'>
        <h1 className='section-title'>
          {t('Period._singular')} {activePeriod.name} - {activePeriod.year}
        </h1>

        <PeriodSummary t={t} period={activePeriod} />

        <ModulesAvailable t={t} modules={activePeriod.modules} />
      </StyledPage>
    )
  );
};

AdminPeriodPage.propTypes = {};

export default AdminPeriodPage;
