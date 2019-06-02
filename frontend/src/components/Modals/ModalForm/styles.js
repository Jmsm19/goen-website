import { styled } from '@material-ui/styles';

import mediaQ from '../../../lib/utils/styling';

const StyledForm = styled('form')({
  root: {
    height: '100%',
    display: 'grid',
    gridGap: '1rem',
    gridTemplateRows: '1fr auto',

    '& .button-area': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',

      [mediaQ.phone]: {
        width: '100%',
        justifyContent: 'center',
      },

      '& .btn': {
        width: '100%',
        justifyContent: 'center',
      },

      '& .btn:first-child': {
        marginRight: '1rem',
        marginBottom: 0,
      },
    },
  },
});

export default StyledForm;
