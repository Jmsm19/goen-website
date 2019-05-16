import styled from 'styled-components';

// import media from '../../../lib/utils/styling';

const StyledFormFields = styled.div`
  &.form-fields {
    min-height: 90px;
    display: grid;
    overflow: visible;
    grid-gap: 1rem;
    grid-template-columns: 1fr;

    .module-name {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: max-content max-content;
    }

    .instructors {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
    }

    .module-schedule,
    .instructors {
      .overlay-container {
        height: 100%;
        width: 100%;

        .selector {
          width: 100%;
          max-width: 100%;
        }
      }
    }
  }
`;

export default StyledFormFields;
