import styled from 'styled-components';

import Card from '../../UI/Card';

const StyledCard = styled(Card)`
  &.card {
    grid-template: 'card-body' 1fr;
    border-color: var(--success-color);
    border-style: dashed;

    .card-body {
      padding: 1.5rem 0;
      height: 100%;
      display: grid;
      align-content: center;
      justify-content: center;

      .create-message {
        height: 100%;
        width: 100%;
        display: grid;
        grid-gap: 0.5rem;
        grid-template-columns: auto 1fr;
        align-items: center;

        color: var(--success-color);
        font-size: 1.4rem;
      }
    }
  }
`;

export default StyledCard;
