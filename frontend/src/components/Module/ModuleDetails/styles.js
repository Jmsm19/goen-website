import styled from 'styled-components';

const StyledContainer = styled.div`
  section {
    display: grid;

    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 1rem;
    }

    &.module-summary-section {
      grid-template-columns: auto 1fr;
      align-items: center;

      img {
        width: 100px;
        min-height: 100px;
      }

      .module-info {
        padding-left: 10px;

        .module-name {
          margin-bottom: 0.5rem;
        }

        .module-schedule {
          margin-bottom: 1rem;
        }
      }
    }

    &.senpai-section {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      align-items: center;

      .senpai-section-title {
        margin-bottom: 0.5rem;
      }
    }

    &.students-section {
    }
  }
`;

export default StyledContainer;
