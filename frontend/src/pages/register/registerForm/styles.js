import styled from 'styled-components';

import { FadeInButtonArea } from './animations';

export const StyledRegisterForm = styled.form`
  overflow: hidden;
  min-height: 350px;
  width: 100%;

  display: grid;
  grid-template-rows: 24px 1fr auto;

  .fields {
    display: grid;
    grid-gap: 10px;
    align-content: flex-start;
  }

  .form-notice {
    color: var(--warning-color);
  }
`;

export const StyledButtonArea = styled(FadeInButtonArea)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 10px;

  .btn {
    margin-bottom: 10px;
    @media screen and (max-width: 350px) {
      width: 100%;
    }
  }

  .btn-primary {
    &:disabled {
      opacity: 0.65 !important;
    }
  }
`;
