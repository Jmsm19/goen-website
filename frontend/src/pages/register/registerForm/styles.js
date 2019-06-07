import { styled } from '@material-ui/styles';

import { FadeInButtonArea } from './animations';

export const StyledRegisterForm = styled('form')({
  minHeight: '350px',
  width: '100%',

  display: 'grid',
  gridTemplateRows: '24px 1fr auto',

  '& .fields': {
    display: 'grid',
    gridGap: '10px',
    alignContent: 'flex-start',
  },

  '& .form-notice': {
    color: 'var(--warning-color)',
  },
});

export const StyledButtonArea = styled(FadeInButtonArea)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '1rem',
  alignItems: 'center',
  marginTop: '10px',

  '& .btn-primary': {
    '&:disabled': {
      opacity: '0.65 !important',
    },
  },
});
