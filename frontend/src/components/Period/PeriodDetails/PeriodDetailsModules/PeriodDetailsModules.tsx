import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import classnames from 'classnames';

import { Grid } from '@material-ui/core';
import { useModules } from '../../../../store/context/ModulesContext';
import useEffectOnce from '../../../../hooks/useEffectOnce';

import ModuleSummaryCard from '../../../Cards/ModuleSummaryCard';
import ModuleCreateCard from '../../../Cards/ModuleCreateCard';

import { sortModules } from '../../../../lib/utils';
import Loading from '../../../Loading';

interface Props {
  periodId: string;
  onCardClick: BtnClick;
  className?: string;
  showCreateCard?: boolean;
  onCreateCardClick?: (event: any) => void;
}

const PeriodDetailsModules: React.FC<Props> = props => {
  const { periodId, onCardClick, className, showCreateCard, onCreateCardClick, ...rest } = props;
  const { modules, searchedPeriods, getModulesForPeriod } = useModules();

  const sectionClassNames = classnames(['modules-section', className]);
  const hasSearchedPeriod = searchedPeriods.includes(periodId);

  useEffectOnce(() => {
    if (!hasSearchedPeriod) {
      getModulesForPeriod(periodId);
    }
  });

  const modulesArr = React.useMemo(() => {
    const arr: Module[] = [];
    modules.forEach(module => {
      if (module.period.id === periodId) {
        arr.push(module);
      }
    });
    return arr;
  }, [modules, periodId]);

  const sortedModules = React.useMemo(() => sortModules(modulesArr), [modulesArr]);

  return hasSearchedPeriod ? (
    <section className={sectionClassNames} {...rest}>
      <Grid container spacing={4}>
        {showCreateCard && onCreateCardClick && (
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <ModuleCreateCard onClick={onCreateCardClick} />
          </Grid>
        )}

        {sortedModules.map(module => (
          <Grid key={uuid()} item xs={12} sm={6} md={4} lg={3}>
            <ModuleSummaryCard module={module} onClick={onCardClick} showPendingPayments />
          </Grid>
        ))}
      </Grid>
    </section>
  ) : (
    <Loading />
  );
};

PeriodDetailsModules.defaultProps = {
  className: undefined,
  showCreateCard: false,
  onCreateCardClick: () => null,
};

PeriodDetailsModules.propTypes = {
  className: PropTypes.string,
  onCardClick: PropTypes.func.isRequired,
  showCreateCard: PropTypes.bool,
  onCreateCardClick: PropTypes.func,
  periodId: PropTypes.string.isRequired,
};

export default PeriodDetailsModules;
