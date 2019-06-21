import { makeStyles } from '@material-ui/styles';

const useTableStyles = makeStyles({
  tableWrapper: {
    overflow: 'auto',
    minHeight: 300,
    maxHeight: 600,
    height: '100%',
  },

  table: {
    '& a': {
      color: 'inherit',

      '&:hover': {
        color: 'var(--light-obscure-primary-color)',
      },
    },
  },

  modulesTable: {
    '& tbody tr': {
      height: 80,
    },
  },

  periodsTable: {
    '& .closed-period': {
      color: 'var(--danger-color)',
    },

    '& .active-period': {
      color: 'var(--success-color)',
      fontWeight: 600,
    },

    '& .delete-btn': {
      opacity: 0,
    },

    '& tbody tr:hover': {
      '& .delete-btn': {
        opacity: 1,
      },
    },
  },

  registrationStatus: {
    '&.idle': {
      color: 'var(--danger-color)',
      fontWeight: 600,
    },

    '&.paying': {
      color: 'var(--warning-color)',
      fontWeight: 600,
    },

    '&.verifying.payment': {
      color: 'var(--info-color)',
      fontWeight: 600,
    },

    '&.registered': {
      color: 'var(--success-color)',
      fontWeight: 600,
    },
  },
});

export default useTableStyles;
