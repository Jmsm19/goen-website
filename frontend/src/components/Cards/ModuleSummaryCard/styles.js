import styled from 'styled-components';
import Card from '../../UI/Card';

const StyledCard = styled(Card)`
  &.card {
    position: relative;
    box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);

    &:hover {
      border-color: var(--light-primary-color);
      transition: all 150ms ease;

      .card-title {
        color: var(--light-primary-color);
        transition: all 150ms ease;
      }
    }

    .bubble {
      position: absolute;
      top: -16px;
      right: 8px;
      background: var(--light-obscure-primary-color);
      color: #fff;
      padding: 2px 6px;
      border-radius: 0.375rem;
    }
  }
`;

export default StyledCard;
