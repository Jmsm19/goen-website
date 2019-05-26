import styled from 'styled-components';

const StyledPage = styled.div`
  height: 100%;

  display: grid;
  grid-template-rows: auto 60px;
  align-items: center;
  justify-content: center;

  font-size: 2rem;

  div {
    .spinner {
      display: block;
      margin: 0 auto;
      margin-bottom: 10px;
      color: var(--primary-color);

      animation: 2s linear infinite rotation;
    }

    .text {
      color: var(--light-black);
      opacity: 0.7;
    }
  }
`;

export default StyledPage;
