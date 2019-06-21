import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { useModules } from '../../../store/context/ModulesContext';

import Card from '../../UI/Card';

import { ModulePropType } from '../../../lib/validation/propTypesValues';
import { getTotalStudents, getTotalRegisteredStudents } from '../../Period/PeriodDetails/fns';

interface Props {
  modules?: Module[];
}

const ConfirmedStudentsCard: React.FC<Props> = ({ modules }) => {
  const { t } = useTranslation();
  const { students } = useModules();

  const studentsArr = React.useMemo(() => {
    const arr: User[][] = [];

    if (Array.isArray(modules)) {
      modules.forEach(module => {
        const ss = students.get(module.id);
        if (ss) arr.push(ss);
        return undefined;
      }, []);
    }

    return arr;
  }, [modules, students]);

  const totalStudents = React.useMemo(() => {
    if (Array.isArray(studentsArr)) {
      return getTotalStudents(studentsArr);
    }
    return 0;
  }, [studentsArr]);

  const totalRegisteredStudents = React.useMemo(() => {
    if (Array.isArray(studentsArr)) {
      return getTotalRegisteredStudents(studentsArr);
    }
    return 0;
  }, [studentsArr]);

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
  modules: PropTypes.arrayOf(ModulePropType.isRequired),
};

export default ConfirmedStudentsCard;
