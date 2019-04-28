import styled from 'styled-components';

const StyledPage = styled.div`
  height: 100%;

  display: grid;
  align-items: center;
  justify-content: center;

  font-size: 2rem;

  div {
    /* width: 350px; */

    .spinner {
      display: block;
      margin: 0 auto;
      margin-bottom: 10px;
      color: var(--primary-color);

      animation: 2s linear infinite rotation;
    }
  }
`;

export default StyledPage;
