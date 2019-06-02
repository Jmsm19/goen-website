import { styled } from '@material-ui/styles';

import { SlideUpCard } from '../../animations/components';

export const StyledPage = styled('div')({
  height: '100%',
  width: '100%',

  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledLoginCard = styled(SlideUpCard)({
  '&.card.login-card': {
    width: '95vw',
    justifyItems: 'center',
    maxWidth: '400px',

    '& .card-img-top': {
      width: '90%',
      display: 'block',
    },

    '& .card-body': {
      paddingTop: '0',
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
