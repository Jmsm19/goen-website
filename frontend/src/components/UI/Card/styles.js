import styled from 'styled-components';

const StyledCard = styled.div`
  &.card {
    width: 18rem;
    display: grid;
    grid-template:
      'card-img' auto
      'card-body' 1fr;
    min-width: 0px;
    word-wrap: break-word;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0.375rem;
    background-color: #fff;
    background-clip: border-box;

    &.card-full-width {
      width: 100%;
    }

    &.card-hoverable {
      will-change: transform;
      transition: all 0.15s ease;

      &:hover {
        transform: translateY(-1px);
      }
    }

    &.card-shadow {
      box-shadow: 0px 0px 2rem 0px rgba(136, 152, 170, 0.15);
    }

    img {
      grid-area: 'card-img';
      vertical-align: middle;
      border-style: none;

      &.card-img-top {
        width: 100%;
        border-top-left-radius: calc(-1px + 0.37rem);
        border-top-right-radius: calc(-1px + 0.37rem);
      }
    }

    .card-body {
      grid-area: 'card-body';
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      text-align: left;
      color: #535353;

      width: 100%;
      padding: 1.5rem;
    }

    .card-title {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
  }
`;

export default StyledCard;
