import styled from 'styled-components';

import media from '../../../lib/utils/styling';

const StyledButtonArea = styled.div`
  &.btn-area {
    width: 100%;

    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 150px 150px;
    justify-content: flex-end;

    ${media.tablet`
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    `}
  }
`;

export default StyledButtonArea;
