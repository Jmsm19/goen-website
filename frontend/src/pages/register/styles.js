import styled from 'styled-components';
import media from '../../lib/utils/styling';

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
    max-width: 400px;
    min-height: 576px;
    justify-items: center;
    grid-template-rows: 1fr;

    ${media.phone`
      max-width: 95vw;
    `}

    .card-body {
      height: 100%;
      display: grid;
      grid-template-rows: 460px auto;
    }

    .to-login-btn {
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
