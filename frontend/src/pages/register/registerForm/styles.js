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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  align-items: center;
  margin-top: 10px;

  .btn-primary {
    &:disabled {
      opacity: 0.65 !important;
    }
  }
`;
