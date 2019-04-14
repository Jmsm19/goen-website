import styled from 'styled-components';

const StyledFormField = styled.div`
  display: grid;
  grid-template-rows: auto 22px;
  z-index: 0;

  .error-field {
    z-index: -1;
  }
`;

export default StyledFormField;
