import { styled } from '@material-ui/styles';
import { DialogActions } from '@material-ui/core';

export const StyledForm = styled('form')({
  height: '100%',
  display: 'grid',
  gridGap: '1rem',
  gridTemplateRows: '1fr auto',
});

export const StyledDialogActions = styled(DialogActions)({
  '&.button-area': {
    display: 'grid',
    gridGap: '1rem',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});
