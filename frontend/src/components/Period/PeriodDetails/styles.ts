import { styled } from '@material-ui/styles';

import mediaQ from '../../../lib/utils/styling';

import PeriodDetailsHeader from './PeriodDetailsHeader';
import SummarySection from './SummarySection';
import PeriodDetailsModules from './PeriodDetailsModules';

export const StyledContainer = styled('div')({
  '& .section-title': {
    marginBottom: '1rem',

    '&:not(:first-child)': {
      fontSize: '1.2rem',
      padding: '0 1rem',
    },
  },

  '& section': {
    '&:not(:last-child)': {
      marginBottom: '2rem',
    },

    '& .card-body': {
      padding: '1rem',
    },

    '&.summary-section, &.modules-section': {
      display: 'grid',
      padding: '0 1rem',
    },
  },
});

export const StyledHeaderSection = styled(PeriodDetailsHeader)({
  '&.details-header': {
    display: 'grid',
    gridGap: '1rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, max-content))',
    justifyContent: 'space-between',
    alignItems: 'center',

    [mediaQ.tablet]: {
      gridTemplateColumns: '1fr',
    },

    '@media screen and (max-width: 950px)': {
      gridTemplateColumns: '1fr',
    },

    '& .period-name': {
      marginBottom: 10,
    },

    '& .card': {
      boxShadow: `0px 1px 3px 0px rgba(0,0,0,0.2),
                  0px 1px 1px 0px rgba(0,0,0,0.14),
                  0px 2px 1px -1px rgba(0,0,0,0.12)`,

      [mediaQ.tablet]: {
        width: '100%',
      },

      '& .card-body': {
        textAlign: 'center',
        padding: '0.725rem',
        letterSpacing: 1,
      },

      '& .card-title': {
        color: '#fff',
        margin: 0,
      },

      '& p': {
        color: '#fff',
        opacity: 0.85,
      },

      '&.period-open': {
        backgroundColor: 'var(--success-color)',
        borderColor: 'var(--success-color)',
      },

      '&.period-closed': {
        backgroundColor: 'var(--danger-color)',
        borderColor: 'var(--danger-color)',
      },
    },
  },
});

export const StyledSummarySection = styled(SummarySection)({
  '&.summary-section': {
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, max-content))',
    gridGap: '10px',

    '& .card': {
      backgroundColor: 'transparent',
      border: 'none',
      boxShadow: 'none',
    },
  },
});

export const StyledModulesSection = styled(PeriodDetailsModules)({
  '&.modules-section': {
    marginTop: 30,
    marginBottom: 30,
    // gridGap: '30px 20px',
    // gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',

    '& .module-create-card': {
      height: '100%',
    },

    // [mediaQ.tablet]: {
    //   gridTemplateColumns: '1fr',
    // },
  },
});
