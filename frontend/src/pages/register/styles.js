import { styled } from '@material-ui/styles';

import mediaQ from '../../lib/utils/styling';

import { SlideUpCard } from '../../animations/components';

export const StyledPage = styled('div')({
  height: '100%',
  width: '100%',

  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',
});

export const StyledRegisterCard = styled(SlideUpCard)({
  '&.card.register-card': {
    position: 'relative',
    width: '900px',
    maxWidth: '400px',
    minHeight: '615px',
    justifyItems: 'center',
    gridTemplateRows: '1fr',

    [mediaQ.phone]: {
      maxWidth: '95vw',
    },

    '& .card-body': {
      height: '100%',
      display: 'grid',
      gridTemplateRows: '1fr auto',
    },

    '& .to-login-btn': {
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
