import { styled } from '@material-ui/styles';
import { Card } from '@material-ui/core';

const StyledCard = styled(Card)({
  '&.card': {
    width: '18rem',
    display: 'grid',
    gridTemplate: `
      'card-img' auto
      'card-body' 1fr
    `,

    minWidth: '0px',
    wordWrap: 'break-word',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '0.375rem',
    backgroundColor: '#fff',
    backgroundClip: 'border-box',

    '&.card-full-width': {
      width: '100%',
    },

    '&.card-hoverable': {
      willChange: 'transform',
      transition: 'all 0.15s ease',

      '&:hover': {
        cursor: 'pointer',
        transform: 'translateY(-1px)',
      },
    },

    '& .card-body': {
      gridArea: 'card-body',
      fontSize: '1rem',
      fontWeight: '400',
      lineHeight: '1.5',
      textAlign: 'left',
      color: '#535353',

      width: '100%',
      padding: '1.5rem',

      '& .card-img-top': {
        gridArea: 'card-img',
        verticalAlign: 'middle',
        borderStyle: 'none',
        minHeight: 140,
        width: '100%',
        margin: '0 auto',
        // borderTopLeftRadius: 'calc(-1px + 0.37rem)',
        // borderTopRightRadius: 'calc(-1px + 0.37rem)',
      },

      '& .card-title': {
        fontSize: '1.2rem',
        marginBottom: '1rem',
      },
    },
  },
});

export default StyledCard;
