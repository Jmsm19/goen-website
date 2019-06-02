import { styled } from '@material-ui/styles';

const StyledPage = styled('div')({
  height: '100%',

  display: 'grid',
  alignItems: 'center',
  justifyContent: 'center',

  fontSize: '2rem',

  '& .loading-container': {
    display: 'grid',
    gridTemplateRows: 'auto 50px',

    '& .text': {
      color: 'var(--light-black)',
      opacity: '0.7',
    },
  },
});

export default StyledPage;
