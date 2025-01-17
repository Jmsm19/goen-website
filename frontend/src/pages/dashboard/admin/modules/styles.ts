import { styled } from '@material-ui/styles';

const StyledPage = styled('div')({
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gridGap: '1rem',

  '& section': {
    display: 'grid',
  },

  '& .table-wrapper': {
    height: '60%',
  },
});

export default StyledPage;
