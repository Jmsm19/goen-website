import styled from 'styled-components';

const StyledSelect = styled.select`
  &.selector {
    font-size: 1rem;
    line-height: 1.5;
    display: block;
    height: calc(2.75rem + 2px);
    width: 100%;
    border: 0;
    border-radius: var(--border-radius);
    background-color: #fff;
    background-clip: padding-box;
    overflow: visible;
    box-shadow: var(--input-box-shadow);
    padding: 0.625rem 0.75rem;
    transition: box-shadow 0.15s ease;
    color: #8898aa;
    min-width: 150px;
    max-width: max-content;

    &:hover {
      cursor: pointer;
    }

    &:focus {
      outline: 0;
    }

    &:hover {
      box-shadow: var(--input-box-shadow-on-focus);
    }

    &:disabled,
    &.disabled {
      opacity: 1;
      color: #8898aa;
      background-color: #e9ecef;
      border-color: #e9ecef;
    }

    .selector-option:disabled {
      color: #8898aa;
    }
  }
`;

export default StyledSelect;
