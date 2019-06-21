import { styled } from '@material-ui/styles';

const StyledPage = styled('div')({
  paddingBottom: '1.5rem',

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
  },

  '& .module-section': {
    '& .section-title': {
      paddingBottom: '0.5rem',
      marginBottom: '2.3rem',
      borderBottom: '1px solid #eee',

      display: 'flex',
      justifyContent: 'space-between',

      '& .module-price': {
        color: 'var(--primary-color)',
        opacity: 0.6,
      },
    },
  },
});

export default StyledPage;
