import styled from 'styled-components';

const StyledAccordion = styled.div`
  &.accordion {
    border: 1px solid var(--shadow-color);
    border-radius: var(--border-radius);

    .accordion-header {
      &.accordion--open {
        border-bottom: 1px solid var(--shadow-color);
      }

      button {
        padding: 0.5rem 1rem;
        display: block;
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        background-color: #fff;
        border: none;

        .accordion-title,
        .accordion-icon {
          color: var(--light-black);
          text-transform: uppercase;
        }

        .accordion-title {
          font-size: 1rem;
        }
      }
    }

    .accordion-content-region {
      overflow-y: hidden;

      .accordion-content {
        color: var(--light-black);
        padding: 0.5rem 1rem;
      }
    }
  }
`;

export default StyledAccordion;
