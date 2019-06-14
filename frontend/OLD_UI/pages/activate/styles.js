import { styled } from '@material-ui/styles';

const StyledPage = styled('div')({
  height: '100%',
  width: '100%',

  display: 'grid',
  justifyContent: 'center',
  alignItems: 'center',

  '& .activation-message-card': {
    width: '95vw',
    maxWidth: '400px',
  },

  '& .error': {
    color: 'var(--danger-color)',
  },

  '& .btn': {
    marginTop: '20px',
  },
});

export default StyledPage;
