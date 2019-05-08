import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { DataContext } from '../../../../context/DataContext';
import { AuthContext } from '../../../../context/AuthContext';
import ModulesTable from '../../../../components/Tables/ModulesTable';

const InstructorModulesPage = props => {
  const { activePeriod } = useContext(DataContext);
  const { authUser } = useContext(AuthContext);
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
