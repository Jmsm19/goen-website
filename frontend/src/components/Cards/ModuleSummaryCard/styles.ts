import { styled } from '@material-ui/styles';
import Card from '../../UI/Card';

const StyledCard = styled(Card)({
  '&.card': {
    overflow: 'visible',
    position: 'relative',
    boxShadow: '0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02)',

    '&:hover': {
      borderColor: 'var(--light-primary-color)',
      transition: 'all 150ms ease',

      '& .card-title': {
        color: 'var(--light-primary-color)',
        transition: 'all 150ms ease',
      },
    },

    '& .badge': {
      position: 'absolute',
      top: -16,
      right: 8,
    },
  },
});

export default StyledCard;
