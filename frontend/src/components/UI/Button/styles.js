import { styled } from '@material-ui/styles';

const StyledButton = styled('button')({
  '&.btn': {
    /* Font */
    fontSize: '0.875rem',
    textTransform: 'uppercase',
    fontWeight: '500',
    lineHeight: '1.75',
    letterSpacing: '0.02857em',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
    /* Appearance */
    minWidth: 64,
    width: 'max-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 8px',
    borderRadius: '0.375rem',
    border: '1px solid transparent',
    boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    /* Others */
    userSelect: 'none',
    transition: 'all 0.15s ease',
    willChange: 'transform',

    '& svg': {
      margin: '0 5px',
    },

    '&.btn-block': {
      display: 'block',
      width: '100%',
    },

    '&:hover:not(:disabled)': {
      cursor: 'pointer',
      transform: 'translateY(-1px)',
    },

    '&:active': {
      outline: '0',
    },

    '&:disabled': {
      opacity: '0.65',
      boxShadow: 'none',
    },

    '&-primary, &-success, &-danger': {
      color: '#fff',

      '& .spinner-container': {
        display: 'flex',
        justifyContent: 'center',

        '& .spinner': {
          color: '#fff',
          textAlign: 'center',
        },
      },
    },

    '&-primary': {
      borderColor: 'var(--light-obscure-primary-color)',
      backgroundColor: 'var(--light-obscure-primary-color)',

      '&:active:not(:disabled)': {
        borderColor: 'var(--primary-color)',
        backgroundColor: 'var(--primary-color)',
      },
    },

    '&-secondary': {
      color: '#212529',
      borderColor: '#f7fafc',
      backgroundColor: '#f7fafc',

      '&:active': {
        borderColor: '#d2e3ee',
        backgroundColor: '#d2e3ee',
      },
    },

    '&-danger': {
      borderColor: 'var(--danger-color)',
      backgroundColor: 'var(--danger-color)',

      '&:active:not(:disabled)': {
        backgroundColor: '#ec0c38',
      },
    },

    '&-success': {
      borderColor: 'var(--success-color)',
      backgroundColor: 'var(--success-color)',

      '&:active:not(:disabled)': {
        backgroundColor: '#24a46d',
      },
    },

    '&-outline': {
      '&-primary, &-secondary, &-success, &-danger': {
        backgroundColor: 'transparent',
        boxShadow: 'none',

        '&:hover:not(:disabled)': {
          transform: 'translateY(-1px)',
          boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
        },

        '&:active:not(:disabled)': {
          boxShadow: 'none',
        },
      },

      '&-primary': {
        color: 'var(--light-obscure-primary-color)',
        borderColor: 'var(--light-obscure-primary-color)',

        '&:hover:not(:disabled)': {
          color: '#fff',
          backgroundColor: 'var(--light-obscure-primary-color)',
        },
      },

      '&-secondary': {
        color: '#f72f57',

        '&:hover:not(:disabled)': {
          color: '#212529',
        },
      },

      '&-danger': {
        color: 'var(--danger-color)',
        borderColor: 'var(--danger-color)',

        '&:hover:not(:disabled)': {
          color: '#fff',
          backgroundColor: 'var(--danger-color)',
        },
      },

      '&-success': {
        color: 'var(--success-color)',
        borderColor: 'var(--success-color)',

        '&:hover:not(:disabled)': {
          color: '#fff',
          backgroundColor: 'var(--success-color)',
        },
      },
    },
  },
});

export default StyledButton;
