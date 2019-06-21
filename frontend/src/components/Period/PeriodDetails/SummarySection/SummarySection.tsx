import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { useModules } from '../../../../store/context/ModulesContext';

import ConfirmedStudentsCard from '../../../Cards/ConfirmedStudentsCard';
import PeriodIncomeCard from '../../../Cards/PeriodIncomeCard';

import { PeriodPropType } from '../../../../lib/validation/propTypesValues';

interface Props {
  period: Period;
  className?: string;
}

const SummarySection: React.FC<Props> = ({ period, className, ...props }) => {
  const { searchedPeriods, modules, students, getStudentsForModule } = useModules();

  const sectionClassNames = classnames(['summary-section', className]);

  const modulesArr = React.useMemo(() => {
    const arr: Module[] = [];
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
      <PeriodIncomeCard modules={modulesArr} />
    </section>
  );
};

SummarySection.defaultProps = {
  className: undefined,
};

SummarySection.propTypes = {
  className: PropTypes.string,
  period: PeriodPropType.isRequired,
};

export default SummarySection;
