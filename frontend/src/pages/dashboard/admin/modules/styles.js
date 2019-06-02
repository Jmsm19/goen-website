import { styled } from '@material-ui/core';

const StyledPage = styled('div')({
  height: '100%',
  display: 'grid',
  gridTemplateRows: 'auto 93%',
  gridGap: '1rem',

  '& section': {
    display: 'grid',
  },

  '& .table-wrapper': {
    height: '60%',
  },
});

export default StyledPage;
