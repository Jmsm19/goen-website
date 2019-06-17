import { styled } from '@material-ui/styles';
import { Card } from '@material-ui/core';

import mediaQ from '../../../lib/utils/styling';

const StyledCard = styled(Card)({
  '&.register-card': {
    position: 'relative',
    width: '900px',
    maxWidth: '400px',

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

    '& .btn': {
      width: '100%',
    },
  },
});

export default StyledCard;
