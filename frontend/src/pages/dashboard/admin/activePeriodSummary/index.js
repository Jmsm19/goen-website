import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Loading from '../../../../components/Loading';
import PeriodSummary from './periodSummary';
import ModulesAvailable from './modulesAvailable';

import { DataContext } from '../../../../context/DataContext';

import StyledPage from './styles';
import ModuleDetailsModal from '../../../../components/Modals/ModuleDetailsModal';

const AdminPeriodPage = props => {
  const { t } = useTranslation();
  const { activePeriod, activePeriodSummary } = useContext(DataContext);
  const [selectedModule, setSelectedModule] = useState(null);

  const deselectModule = () => setSelectedModule(null);

  if (!activePeriod) {
    return <Loading />;
  }

  return (
    !!activePeriod && (
      <StyledPage className='dashboard-home'>
        <h1 className='section-title'>
          {t('Period._singular')} {activePeriod.name} - {activePeriod.year}
        </h1>

        <PeriodSummary t={t} period={activePeriod} periodSummary={activePeriodSummary} />

        <ModulesAvailable t={t} modules={activePeriod.modules} selectModule={setSelectedModule} />

        {/* Modal */}
        <ModuleDetailsModal
          isVisible={!!selectedModule}
          module={selectedModule}
          onClose={deselectModule}
        />
      </StyledPage>
    )
  );
};

AdminPeriodPage.propTypes = {};

export default AdminPeriodPage;
