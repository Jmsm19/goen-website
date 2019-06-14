import { styled } from '@material-ui/styles';

export const StyledPage = styled('div')({
  '& h1': {
    marginBottom: '1.5rem',
  },
});

export const StyledSection = styled('section')({
  marginBottom: '2.5rem',

  '& h2': {
    marginBottom: '1rem',
  },
});

export const StyledSetting = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1.5fr minmax(max-content, 1fr)',
  alignItems: 'center',
});
