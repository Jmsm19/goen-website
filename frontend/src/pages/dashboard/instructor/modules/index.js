import React from 'react';
import { useTranslation } from 'react-i18next';

import usePeriodDataContext from '../../../../hooks/usePeriodDataContext';
import useAuthContext from '../../../../hooks/useAuthContext';

import ModulesTable from '../../../../components/Tables/ModulesTable';

const InstructorModulesPage = props => {
  const { activePeriod } = usePeriodDataContext();
  const { authUser } = useAuthContext();
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
