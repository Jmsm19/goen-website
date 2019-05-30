import styled from 'styled-components';

export const StyledPage = styled.div`
  &.user-profile {
    section {
      &:not(:last-child) {
        margin-bottom: 2rem;
      }

      div {
        display: grid;
      }

      h2 {
        font-size: 1rem;
      }
    }
  }
`;

export const StyledRoleSections = styled.div`
  &.role-sections {
    .section-selector-area {
      margin-bottom: 2rem;

      display: grid;
      justify-content: center;

      .btn {
        font-size: 0.9rem;
      }
    }
  }
`;
