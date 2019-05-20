import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../context/ModulesContext';

import Card from '../../UI/Card';

import { getTotalStudents, getTotalRegisteredStudents } from '../../Period/PeriodDetails/fns';

const ConfirmedStudentsCard = ({ modules }) => {
  const { t } = useTranslation();
  const { students } = useModules();

  const studentsArr = React.useMemo(() => modules.map(module => students.get(module.id)), [
    modules,
    students,
  ]);

  const totalStudents = React.useMemo(() => getTotalStudents(studentsArr), [studentsArr]);

  const totalRegisteredStudents = React.useMemo(() => getTotalRegisteredStudents(studentsArr), [
    studentsArr,
  ]);

  return (
    <Card title={t('Student.ConfirmedStudents')} fullWidth>
      <p>
        {totalRegisteredStudents} / {totalStudents}
      </p>
    </Card>
  );
};

ConfirmedStudentsCard.defaultProps = {
  modules: [],
};

ConfirmedStudentsCard.propTypes = {
  modules: PropTypes.arrayOf(PropTypes.shape()),
};

export default ConfirmedStudentsCard;
