import { styled } from '@material-ui/styles';

import mediaQ from '../../../lib/utils/styling';

const StyledGrid = styled('div')({
  '&.card-grid': {
    display: 'grid',
    gridGap: '30px 20px',
    gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',

    [mediaQ.tablet]: {
      gridTemplateColumns: '1fr',
    },
  },
});

export default StyledGrid;
