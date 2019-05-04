import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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
      <h1>My modules as Instructor</h1>

      <ModulesTable modules={currentPeriodModules} loading={!activePeriod} />
    </div>
  );
};

InstructorModulesPage.propTypes = {};

export default InstructorModulesPage;
