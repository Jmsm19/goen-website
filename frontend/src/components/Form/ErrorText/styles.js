import { styled } from '@material-ui/styles';

const StyledErrorText = styled('p')({
  '&.error-text': {
    color: 'var(--warning-color)',
    paddingLeft: 3,
    fontSize: '0.9375rem',
  },
});

export default StyledErrorText;
