import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '../../../../store/context/AuthContext';
import { usePeriods } from '../../../../store/context/PeriodsContext';

import ModulesTable from '../../../../components/Tables/ModulesTable';

const InstructorModulesPage = props => {
  const { authUser } = useAuth();
  const { activePeriod } = usePeriods();
  const { t } = useTranslation();

  const currentPeriodModules = activePeriod
    ? authUser.modulesAsInstructor.filter(module => module.period.id === activePeriod.id)
    : [];

  return (
    <div className='dashboard-instructor-modules'>
      <h1>{t('Instructor.MyModules')}</h1>

      <ModulesTable modules={currentPeriodModules} loading={!activePeriod} />
    </div>
  );
};

InstructorModulesPage.propTypes = {};

export default InstructorModulesPage;
