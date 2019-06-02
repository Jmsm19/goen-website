import { styled } from '@material-ui/styles';

const StyledAccordion = styled('div')({
  '&.accordion': {
    border: '1px solid var(--shadow-color)',
    borderRadius: 'var(--border-radius)',

    '& .accordion-header': {
      '&.accordion--open': {
        borderBottom: '1px solid var(--shadow-color)',
      },

      '& button': {
        padding: '0.5rem 1rem',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

        backgroundColor: '#fff',
        border: 'none',

        '& .accordion-title, & .accordion-icon': {
          color: 'var(--light-black)',
          textTransform: 'uppercase',
        },

        '& .accordion-title': {
          fontSize: '1rem',
        },
      },
    },

    '& .accordion-content-region': {
      overflowY: 'hidden',

      '& .accordion-content': {
        color: 'var(--light-black)',
        padding: '0.5rem 1rem',
      },
    },
  },
});

export default StyledAccordion;
