import styled from 'styled-components';

const StyledButtonArea = styled.div`
  &.btn-area {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, max-content);
  }
`;

export default StyledButtonArea;
