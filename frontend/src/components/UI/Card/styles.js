import { styled } from '@material-ui/styles';

const StyledCard = styled('div')({
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

    '&.card-shadow': {
      boxShadow: '0px 0px 2rem 0px rgba(136, 152, 170, 0.15)',
    },

    '& img': {
      gridArea: 'card-img',
      verticalAlign: 'middle',
      borderStyle: 'none',

      '&.card-img-top': {
        width: '100%',
        borderTopLeftRadius: 'calc(-1px + 0.37rem)',
        borderTopRightRadius: 'calc(-1px + 0.37rem)',
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
    },

    '& .card-title': {
      fontSize: '1.2rem',
      marginBottom: '1rem',
    },
  },
});

export default StyledCard;
