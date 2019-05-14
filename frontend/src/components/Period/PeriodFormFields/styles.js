import styled from 'styled-components';

import media from '../../../lib/utils/styling';

const StyledFormFields = styled.div`
  &.form-fields {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr;
    min-height: 90px;

    .name-year,
    .date-fields {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: 1fr 1fr;
    }

    ${media.tablet`
    .date-fields {
      grid-template-columns: 1fr;
    }
    `}
  }
`;

export default StyledFormFields;
