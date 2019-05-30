import styled from 'styled-components';
import { Card } from 'shards-react';

const StyledCard = styled(Card)`
  &.card {
    position: relative;
    border: 1px solid transparent;
    /* box-shadow: var(--drop-shadow); */

    &:hover {
      cursor: pointer;
      border: 1px solid var(--light-primary-color);
      transition: all 150ms ease;

      .card-title {
        color: var(--light-primary-color);
        transition: all 150ms ease;
      }
    }

    .badge {
      font-size: 0.9rem;
      padding: 8px;
      position: absolute;
      top: -18px;
      right: 8px;
    }
  }
`;

export default StyledCard;
