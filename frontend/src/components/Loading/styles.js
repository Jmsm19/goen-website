import styled from 'styled-components';

const StyledPage = styled.div`
  height: 100%;

  display: grid;
  align-items: center;
  justify-content: center;

  font-size: 2rem;

  .loading-container {
    display: grid;
    grid-template-rows: auto 50px;

    .text {
      color: var(--light-black);
      opacity: 0.7;
    }
  }
`;

export default StyledPage;
