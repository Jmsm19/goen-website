import { styled } from '@material-ui/styles';

const StyledInput = styled('input')({
  '&.input': {
    fontSize: '1rem',
    lineHeight: '1.5',
    display: 'block',
    height: 'calc(2.75rem + 2px)',
    width: '100%',
    border: '0',
    borderRadius: '0.375rem',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    overflow: 'visible',
    boxShadow: '0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)',
    padding: '0.625rem 0.75rem',
    transition: 'box-shadow 0.15s ease',
    color: '#8898aa',

    '&::placeholder': {
      color: 'rgba(0, 0, 0, 0.5)',
    },

    '&.error, &.error': {
      color: 'var(--warning-color)',
    },

    '&.success, &.success': {
      color: 'var(--success-color)',
    },

    '&:focus': {
      outline: '0',
      boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
    },

    '&: disabled &.disabled': {
      opacity: '1',
      color: '#8898aa',
      backgroundColor: '#e9ecef',
      borderColor: '#e9ecef',
    },

    '&.flat': {
      boxShadow: 'none',
      border: '1px solid #cad1d7',
      transition: 'all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)',

      '&.error, &.error': {
        borderColor: 'var(--warning-color)',
      },

      '&.success, &.success': {
        borderColor: 'var(--success-color)',
      },

      '&:focus': {
        outline: '0',
        borderColor: 'rgba(211, 50, 50, 0.25)',
      },
    },
  },
});

export default StyledInput;
