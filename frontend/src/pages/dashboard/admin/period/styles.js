import styled from 'styled-components';

const StyledPage = styled.div`
  .section-title {
    margin-bottom: 1rem;
  }

  section {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    .card-body {
      padding: 1rem;
    }

    &.summary-section,
    &.modules-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(330px, 1fr));
    }

    &.summary-section {
      padding: 0 1rem;

      .card {
        background-color: transparent;
        border: none;

        &:not(:last-child) {
          margin-bottom: 10px;
        }

        .card-body {
          padding: 0;

          .card-title + div {
            display: grid;
            grid-gap: 10px;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          }
        }
      }
    }

    &.modules-section {
      margin-bottom: 30px;
      grid-gap: 20px;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

      .card {
        &:hover {
          border-color: var(--light-primary-color);
          transition: all 150ms ease;

          .card-title {
            color: var(--light-primary-color);
            transition: all 150ms ease;
          }
        }
      }
    }
  }
`;

export default StyledPage;
