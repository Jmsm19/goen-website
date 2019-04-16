import styled from 'styled-components';

const StyledPage = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  justify-content: center;
  align-items: center;

  .activation-message-card {
    width: 95vw;
    max-width: 400px;
  }

  .error {
    color: var(--danger-color);
  }

  .btn {
    margin-top: 20px;
  }
`;

export default StyledPage;
