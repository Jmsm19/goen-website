import styled from 'styled-components';

import media from '../../../lib/utils/styling';

const StyledGrid = styled.div`
  &.card-grid {
    display: grid;
    grid-gap: 30px 20px;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));

    ${media.tablet`
    grid-template-columns: 1fr;
    `}
  }
`;

export default StyledGrid;
