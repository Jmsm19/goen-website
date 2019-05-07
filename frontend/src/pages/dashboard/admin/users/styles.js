import styled from 'styled-components';

const StyledPage = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 93%;
  grid-gap: 1rem;

  section {
    display: grid;
    align-items: flex-start;
  }

  .table-wrapper {
    height: 100%;
    max-height: 73vh;
  }

  .users-section {
    grid-template-rows: auto 1fr;
    grid-gap: 1rem;

    .users-search-area {
      display: flex;
      justify-items: space-between;

      input {
        margin-right: 10px;

        & + .btn {
          font-size: 0.8rem;
          padding: 0.625rem;
        }
      }
    }
  }
`;

export default StyledPage;
