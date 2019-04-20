import styled from 'styled-components';
import { media } from '../../lib/utils/styling';

import { SlideUpCard } from '../../animations/components';

export const StyledPage = styled.div`
  height: 100%;
  width: 100%;

  display: grid;
  justify-content: center;
  align-items: center;
`;

export const StyledRegisterCard = styled(SlideUpCard)`
  &.card.register-card {
    position: relative;
    width: 900px;
    max-width: 95vw;
    min-height: 615px;
    justify-items: center;
    grid-template-rows: 1fr;

    ${media.phone`
      max-width: 400px;
    `}

    .card-body {
      height: 100%;
      display: grid;
      grid-template-rows: 1fr auto;
    }

    .to-login-btn {
      display: block;
      text-align: center;
      margin-top: 20px;

      .btn {
        display: inline-block;
      }
    }
  }
`;
