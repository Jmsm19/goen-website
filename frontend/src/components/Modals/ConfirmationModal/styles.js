import styled from 'styled-components';

import ButtonArea from './buttonArea';

const StyledButtonArea = styled(ButtonArea)`
  &.btn-area {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr 1fr;
    justify-items: center;
  }
`;

export default StyledButtonArea;
