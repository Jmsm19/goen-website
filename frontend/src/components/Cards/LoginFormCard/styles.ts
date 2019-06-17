import { styled } from '@material-ui/styles';
import { Card } from '@material-ui/core';

const StyledCard = styled(Card)({
  '&.login-card': {
    width: '95vw',
    justifyItems: 'center',
    maxWidth: '400px',

    '& .card-body': {
      display: 'grid',
      gridTemplate: '140px 1fr auto / 1fr',
    },

    '& .card-img-top': {
      width: '90%',
      height: 'auto',
      display: 'block',
      margin: '0 auto',
    },

    '& .to-register-btn': {
      display: 'block',
      width: 'max-content',
      textAlign: 'center',
      margin: '0 auto',
      marginTop: '20px',

      '& .btn': {
        display: 'inline-block',
      },
    },
  },
});

export default StyledCard;
