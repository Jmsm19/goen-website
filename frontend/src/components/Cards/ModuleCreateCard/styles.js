import { styled } from '@material-ui/styles';

import Card from '../../UI/Card';

const StyledCard = styled(Card)({
  '&.card': {
    gridTemplate: `'card-body' 1fr`,
    borderColor: 'var(--success-color)',
    borderStyle: 'dashed',
    boxShadow: 'none',

    '& .card-body': {
      padding: '1.5rem 0',
      height: '100%',
      display: 'grid',
      alignContent: 'center',
      justifyContent: 'center',

      '& .create-message': {
        height: '100%',
        width: '100%',
        display: 'grid',
        gridGap: '0.5rem',
        gridTemplateColumns: 'auto 1fr',
        alignItems: 'center',
        color: 'var(--success-color)',
        fontSize: '1.4rem',
      },
    },
  },
});

export default StyledCard;
