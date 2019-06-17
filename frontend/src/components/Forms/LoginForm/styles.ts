import { styled } from '@material-ui/styles';

const StyledForm = styled('form')({
  marginTop: '20px',

  '& .fields': {
    display: 'grid',
    gridGap: '10px',
  },

  '& .btn': {
    marginTop: '10px',
  },
});

export default StyledForm;
