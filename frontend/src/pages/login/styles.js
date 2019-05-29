import styled from 'styled-components';

import { SlideUpCard } from '../../animations/components';

export const StyledPage = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  justify-content: center;
  align-items: center;
`;

export const StyledLoginCard = styled(SlideUpCard)`
  &.card.login-card {
    width: 95vw;
    justify-items: center;
    max-width: 400px;

    .card-img-top {
      min-height: 160px;
      width: 90%;
      display: block;
      margin: 0 auto;
    }

    .to-register-btn {
      display: block;
      width: max-content;
      text-align: center;
      margin: 0 auto;
      margin-top: 20px;

      .btn {
        display: inline-block;
      }
    }
  }
`;
