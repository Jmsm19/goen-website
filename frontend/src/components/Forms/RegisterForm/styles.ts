import { styled } from '@material-ui/styles';
import { animated } from 'react-spring';

export const StyledRegisterForm = styled('form')({
  minHeight: 430,
  width: '100%',

  display: 'grid',
  gridTemplateRows: '24px 1fr 48px',

  '& .fields': {
    display: 'grid',
    gridGap: '10px',
    alignContent: 'flex-start',
  },

  '& .form-notice': {
    color: 'var(--warning-color)',
  },
});

export const StyledButtonArea = styled(animated.div)({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: '1rem',
  alignItems: 'center',
  marginTop: 10,

  '& .btn-primary': {
    '&:disabled': {
      opacity: 0.65,
    },
  },
});
