import styled from 'styled-components';

const StyledFormField = styled.div`
  display: grid;
  grid-gap: 3px;
  grid-template-rows: auto 22px;
  z-index: 0;

  .error-text {
    z-index: -1;
  }
`;

export default StyledFormField;
