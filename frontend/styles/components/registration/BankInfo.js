import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, max-content));

  p {
    letter-spacing: 1px;
  }
`;

export default StyledContainer;
