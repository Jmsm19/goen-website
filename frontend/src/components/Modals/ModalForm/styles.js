import styled from 'styled-components';

import media from '../../../lib/utils/styling';

const StyledForm = styled.form`
  height: 100%;
  display: grid;
  grid-gap: 1rem;
  grid-template-rows: 1fr auto;

  .button-area {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    ${media.phone`
    width: 100%;
    justify-content: center;

    .btn {
      width: 100%;
      justify-content: center;
    }
    `}

    .btn:first-child {
      margin-right: 1rem;
      margin-bottom: 0;
    }
  }
`;

export default StyledForm;
