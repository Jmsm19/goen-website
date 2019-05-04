import styled from 'styled-components';

export const StyledPage = styled.div`
  &.user-profile {
    section {
      &:not(:last-child) {
        margin-bottom: 2rem;
      }

      h2 {
        font-size: 1rem;
      }
    }
  }
`;

export const StyledSectionSelector = styled.div`
  &.section-selector {
    display: flex;
    flex-direction: row;
    color: rgba(67, 67, 67, 0.7);
    box-shadow: var(--drop-shadow);
    width: max-content;
    margin: 0 auto;
    margin-bottom: 2rem;

    .selector {
      --border: 1px solid var(--light-primary-color);
      padding: 0.6rem;
      border: var(--border);
      border-left: none;
      border-right: none;

      &:first-child {
        border-left: var(--border);
        border-top-left-radius: 0.625rem;
        border-bottom-left-radius: 0.625rem;
      }

      &:last-child {
        border-right: var(--border);
        border-top-right-radius: 0.625rem;
        border-bottom-right-radius: 0.625rem;
      }

      &:hover,
      &.selected {
        background-color: var(--primary-color);
        color: #fff;
      }

      &:hover {
        cursor: pointer;
      }

      &.selected {
        border: none;
      }

      input[type='radio'] {
        display: none;
      }
    }
  }
`;
