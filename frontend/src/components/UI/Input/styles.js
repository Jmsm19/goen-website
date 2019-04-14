import styled from 'styled-components';

const StyledInput = styled.input`
  &.input {
    font-size: 1rem;
    line-height: 1.5;
    display: block;
    height: calc(2.75rem + 2px);
    width: 100%;
    border: 0;
    border-radius: 0.375rem;
    background-color: #fff;
    background-clip: padding-box;
    overflow: visible;
    box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);
    padding: 0.625rem 0.75rem;
    border-radius: 0.375rem;
    transition: box-shadow 0.15s ease;
    color: #8898aa;

    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }

    &.error,
    &.error::placeholder {
      color: var(--warning-color);
    }

    &.success,
    &.success::placeholder {
      color: var(--success-color);
    }

    &:focus {
      outline: 0;
    }

    &:focus {
      box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    &:disabled,
    &.disabled {
      opacity: 1;
      color: #8898aa;
      background-color: #e9ecef;
      border-color: #e9ecef;
    }

    &.flat {
      box-shadow: none;
      border: 1px solid #cad1d7;
      transition: all 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);

      &.error,
      &.error::placeholder {
        border-color: var(--warning-color);
      }

      &.success,
      &.success::placeholder {
        border-color: var(--success-color);
      }

      &:focus {
        outline: 0;
        border-color: rgba(211, 50, 50, 0.25);
      }
    }
  }
`;

export default StyledInput;
