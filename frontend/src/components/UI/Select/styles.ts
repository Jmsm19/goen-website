import { styled } from '@material-ui/styles';

const StyledSelect = styled('select')({
  '&.selector': {
    fontSize: '1rem',
    lineHeight: '1.5',
    display: 'block',
    height: 'calc(2.75rem + 2px)',
    width: '100%',
    border: '0',
    borderRadius: 'var(--border-radius)',
    backgroundColor: '#fff',
    backgroundClip: 'padding-box',
    overflow: 'visible',
    boxShadow: 'var(--input-box-shadow)',
    padding: '0.625rem 0.75rem',
    transition: 'box-shadow 0.15s ease',
    color: '#8898aa',
    minWidth: '150px',
    maxWidth: 'max-content',

    '&:hover': {
      cursor: 'pointer',
    },

    '&:focus': {
      outline: '0',
    },

    '&:hover:disabled': {
      cursor: 'not-allowed',
    },

    '&:hover:not(:disabled)': {
      boxShadow: 'var(--input-box-shadow-on-focus)',
    },

    '&:disabled': {
      opacity: 1,
      color: '#8898aa',
      backgroundColor: '#e9ecef',
      borderColor: '#e9ecef',
    },

    '& .selector-option:disabled': {
      color: '#8898aa',
    },
  },
});

export default StyledSelect;
