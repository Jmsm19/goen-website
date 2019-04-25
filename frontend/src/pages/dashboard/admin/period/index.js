import React from 'react';
import { useTranslation } from 'react-i18next';

import Loading from '../../../../components/Loading';
import PeriodSummary from './periodSummary';
import ModulesAvailable from './modulesAvailable';

import useAxios from '../../../../hooks/useAxios';

import StyledPage from './styles';

const AdminPeriodPage = props => {
  const { t } = useTranslation();
  const [isRequesting, response] = useAxios('/periods/active');

  if (isRequesting) {
    return <Loading />;
  }

  let period;
  if (response) {
    period = response.data;
  }

  return (
    !!period && (
      <StyledPage className='dashboard-home'>
        <h1 className='section-title'>
          {t('Period')} {period.name} - {period.year}
        </h1>

        <PeriodSummary t={t} period={period} />

        <ModulesAvailable t={t} modules={period.modules} />
      </StyledPage>
    )
  );
};

AdminPeriodPage.propTypes = {};

export default AdminPeriodPage;
