import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { useModules } from '../../../../context/ModulesContext';

import ConfirmedStudentsCard from '../../../Cards/ConfirmedStudentsCard';
import PeriodIncomeCard from '../../../Cards/PeriodIncomeCard';

const SummarySection = ({ t, period, className, ...props }) => {
  const { searchedPeriods, modules, students, getStudentsForModule } = useModules();

  const sectionClassNames = classnames(['summary-section', className]);

  const modulesArr = React.useMemo(() => {
    const arr = [];
    if (searchedPeriods.includes(period.id)) {
      modules.forEach(module => {
        if (module.period.id === period.id) {
          arr.push(module);
        }
      });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedPeriods]);

  React.useEffect(() => {
    if (searchedPeriods.includes(period.id)) {
      modules.forEach(module => {
        if (module.period.id === period.id && !students.has(module.id)) {
          getStudentsForModule(module.id);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedPeriods]);

  return (
    <section className={sectionClassNames} {...props}>
      <ConfirmedStudentsCard modules={modulesArr} />
      <PeriodIncomeCard modules={modulesArr} students={students} />
    </section>
  );
};

SummarySection.defaultProps = {
  className: null,
};

SummarySection.propTypes = {
  className: PropTypes.string,
  t: PropTypes.func.isRequired,
  period: PropTypes.shape({
    signupFrom: PropTypes.string,
    signupUntil: PropTypes.string,
    modules: PropTypes.arrayOf(PropTypes.shape()),
  }).isRequired,
};

export default SummarySection;
