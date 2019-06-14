import { styled } from '@material-ui/styles';

export const StyledPage = styled('div')({
  '&.user-profile': {
    '& section': {
      '&:not(:last-child)': {
        marginBottom: '2rem',
      },

      '& div': {
        display: 'grid',
      },

      '& h2': {
        fontSize: '1rem',
        marginBottom: '1rem',
      },
    },
  },
});

const border = '1px solid var(--light-primary-color)';
export const StyledSectionSelector = styled('div')({
  '&.section-selector': {
    display: 'flex',
    flexDirection: 'row',
    color: 'rgba(67, 67, 67, 0.7)',
    boxShadow: 'var(--drop-shadow)',
    width: 'max-content',
    margin: '0 auto',
    marginBottom: '2rem',

    '& .selector': {
      padding: '0.6rem',
      border,
      borderLeft: 'none',
      borderRight: 'none',

      '&:first-child': {
        borderLeft: border,
        borderTopLeftRadius: '0.625rem',
        borderBottomLeftRadius: '0.625rem',
      },

      '&:last-child': {
        borderRight: border,
        borderTopRightRadius: '0.625rem',
        borderBottomRightRadius: '0.625rem',
      },

      '&:hover, &.selected': {
        backgroundColor: 'var(--primary-color)',
        color: '#fff',
      },

      '&:hover': {
        cursor: 'pointer',
      },

      '&.selected': {
        border: 'none',
      },

      '& input[type="radio"]': {
        display: 'none',
      },
    },
  },
});
