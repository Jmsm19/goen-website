import styled from 'styled-components';

const StyledPage = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;

  section {
    display: grid;
    grid-template-columns: 1fr;
  }

  .table-wrapper {
    height: 60%;
  }
`;

export default StyledPage;
