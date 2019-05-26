import styled from 'styled-components';

const StyledContainer = styled.div`
  &.module-summary {
    display: grid;
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
`;

export default StyledContainer;
