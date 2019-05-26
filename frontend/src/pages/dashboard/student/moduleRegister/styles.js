import styled from 'styled-components';

const StyledPage = styled.div`
  padding-bottom: 1.5rem;

  .section-title {
    margin-bottom: 1rem;

    &:not(:first-child) {
      font-size: 1.2rem;
      padding: 0 1rem;
    }
  }

  section {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }

  .module-section {
    .section-title {
      padding-bottom: 0.5rem;
      margin-bottom: 2.3rem;
      border-bottom: 1px solid #eee;

      display: flex;
      justify-content: space-between;

      .module-price {
        color: var(--primary-color);
        opacity: 0.6;
      }
    }
  }
`;

export default StyledPage;
