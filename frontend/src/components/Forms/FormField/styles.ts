import { styled } from '@material-ui/styles';

const StyledFormField = styled('div')({
  display: 'grid',
  gridGap: 3,
  gridTemplateRows: 'auto 22px',
  zIndex: 0,

  '& .animation-wrapper': {
    zIndex: -1,
  },
});

export default StyledFormField;
