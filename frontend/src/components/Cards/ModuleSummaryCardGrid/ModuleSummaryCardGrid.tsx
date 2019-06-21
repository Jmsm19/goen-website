import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import Loading from '../../Loading';
import ModuleSummaryCard from '../ModuleSummaryCard';

import { ModulePropType } from '../../../lib/validation/propTypesValues';

interface Props {
  modules: Module[];
  onCardClick?: BtnClick;
  isLoading?: boolean;
}

const ModuleSummaryCardGrid: React.FC<Props> = ({ modules, onCardClick, isLoading }) => {
  if (isLoading) {
    return <Loading text='Loading modules...' />;
  }

  return (
    <Grid container spacing={4}>
      {modules.map(module => (
        <Grid key={module.id} item xs={12} sm={6} md={4} lg={3}>
          <ModuleSummaryCard
            module={module}
            onClick={onCardClick}
            showPendingPayments={false}
            showAvailableSlots
          />
        </Grid>
      ))}
    </Grid>
  );
};

ModuleSummaryCardGrid.defaultProps = {
  onCardClick: () => null,
  isLoading: false,
};

ModuleSummaryCardGrid.propTypes = {
  modules: PropTypes.arrayOf(ModulePropType.isRequired).isRequired,
  onCardClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default ModuleSummaryCardGrid;
