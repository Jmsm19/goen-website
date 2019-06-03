import { styled } from '@material-ui/styles';
import { DialogActions } from '@material-ui/core';

import mediaQ from '../../../lib/utils/styling';

export const StyledForm = styled('form')({
  height: '100%',
  display: 'grid',
  gridGap: '1rem',
  gridTemplateRows: '1fr auto',
});

export const StyledDialogActions = styled(DialogActions)({
  '&.button-area': {
    [mediaQ.phone]: {
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',

      '& .btn': {
        width: '100%',
        justifyContent: 'center',

        '&:first-child': {
          marginRight: '1rem',
          marginBottom: 0,
        },
      },
    },
  },
});
