import { styled } from '@material-ui/styles';

import mediaQ from '../../../lib/utils/styling';

const StyledButtonArea = styled('div')({
  '&.btn-area': {
    width: '100%',

    display: 'grid',
    gridGap: '1rem',
    gridTemplateColumns: '150px 150px',
    justifyContent: 'flex-end',

    [mediaQ.tablet]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr 1fr',
      justifyContent: 'center',
    },
  },
});

export default StyledButtonArea;
