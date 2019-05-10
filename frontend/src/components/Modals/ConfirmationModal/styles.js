import styled from 'styled-components';

import ButtonArea from './buttonArea';

const StyledButtonArea = styled(ButtonArea)`
  &.btn-area {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: ${({ isMobile }) => (isMobile ? '1fr' : 'auto max-content')};
    grid-template-rows: ${({ isMobile }) => (isMobile ? '1fr 1fr' : '1fr')};
    justify-items: ${({ isMobile }) => (isMobile ? 'center' : 'flex-end')};
  }
`;

export default StyledButtonArea;
