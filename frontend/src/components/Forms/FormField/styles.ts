import { styled } from '@material-ui/styles';

const StyledFormField = styled('div')({
  display: 'grid',
  gridGap: 3,
  gridTemplateRows: 'auto 22px',
  zIndex: 0,

  '& .overlay-container, & input': {
    zIndex: 1,
  },

  '& .animation-wrapper': {
    zIndex: 0,
  },
});

export default StyledFormField;
