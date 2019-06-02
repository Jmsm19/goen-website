import { styled } from '@material-ui/styles';

const StyledButtonArea = styled('div')({
  '&.btn-area': {
    display: 'grid',
    gridGap: '1rem',
    gridTemplateColumns: 'repeat(2, max-content)',
  },
});

export default StyledButtonArea;
