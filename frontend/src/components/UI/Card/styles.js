import styled from 'styled-components';

const StyledCard = styled.div`
  &.card {
    width: 18rem;
    display: flex;
    flex-direction: column;
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
      vertical-align: middle;
      border-style: none;

      &.card-img-top {
        width: 100%;
        border-top-left-radius: calc(-1px + 0.37rem);
        border-top-right-radius: calc(-1px + 0.37rem);
      }
    }

    .card-body {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      text-align: left;
      color: #525f7f;

      padding: 1.5rem;
      flex: 1 1 auto;
    }

    .card-title {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
  }
`;

export default StyledCard;
