import styled from 'styled-components';

const StyledButton = styled.button`
  &.btn {
    /* Font */
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 0.25em;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    /* Appearance */
    width: max-content;
    display: flex;
    align-items: center;
    padding: 0.625rem 1.25rem;
    border-radius: 0.375rem;
    border: 1px solid transparent;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    /* Others */
    user-select: none;
    transition: all 0.15s ease;
    will-change: transform;

    svg {
      margin: 0 5px;
    }

    &.btn-block {
      display: block;
      width: 100%;
    }

    &:hover:not(:disabled) {
      cursor: pointer;
      transform: translateY(-1px);
    }

    &:active {
      outline: 0;
    }

    &:disabled {
      opacity: 0.65;
      box-shadow: none;
    }

    &-primary,
    &-success,
    &-danger {
      color: #fff;
    }

    &-primary {
      border-color: var(--light-obscure-primary-color);
      background-color: var(--light-obscure-primary-color);

      &:active:not(:disabled) {
        border-color: var(--primary-color);
        background-color: var(--primary-color);
      }
    }

    &-secondary {
      color: #212529;
      border-color: #f7fafc;
      background-color: #f7fafc;

      &:active {
        border-color: #d2e3ee;
        background-color: #d2e3ee;
      }
    }

    &-danger {
      border-color: var(--danger-color);
      background-color: var(--danger-color);

      &:active:not(:disabled) {
        background-color: #ec0c38;
      }
    }

    &-success {
      border-color: var(--success-color);
      background-color: var(--success-color);

      &:active:not(:disabled) {
        background-color: #24a46d;
      }
    }

    &-outline {
      &-primary,
      &-secondary,
      &-success,
      &-danger {
        background-color: transparent;
        box-shadow: none;

        &:hover:not(:disabled) {
          color: #fff;
          transform: translateY(-1px);
          box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
        }

        &:active:not(:disabled) {
          box-shadow: none;
        }
      }

      &-primary {
        color: var(--light-obscure-primary-color);
        border-color: var(--light-obscure-primary-color);

        &:hover:not(:disabled) {
          background-color: var(--light-obscure-primary-color);
        }
      }

      &-secondary {
        color: #f72f57;

        &:hover:not(:disabled) {
          color: #212529;
        }
      }

      &-danger {
        color: var(--danger-color);
        border-color: var(--danger-color);

        &:hover:not(:disabled) {
          background-color: var(--danger-color);
        }
      }

      &-success {
        color: var(--success-color);
        border-color: var(--success-color);

        &:hover:not(:disabled) {
          background-color: var(--success-color);
        }
      }
    }
  }
`;

export default StyledButton;
