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

export const StyledLoginCard = styled(SlideUpCard)`
  &.card.login-card {
    width: 95vw;
    justify-items: center;
    max-width: 400px;

    .card-img-top {
      width: 90%;
      display: block;
    }

    .card-body {
      padding-top: 0;
    }

    .to-register-btn {
      display: block;
      text-align: center;
      margin-top: 20px;
    }
  }
`;
