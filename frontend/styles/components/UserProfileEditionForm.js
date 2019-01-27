import styled from 'styled-components';
import { Form } from 'antd';
import media from '../../utils/styling';

export const StyledForm = styled(Form)`
  .input-area {
    display: grid;
    grid-template-columns: repeat(2, minmax(300px, 600px));
    grid-gap: 0 30px;
  }

  ${media.tablet`
    .input-area {
    display: grid;
    grid-template-columns: repeat(1, minmax(300px, 600px));
    grid-gap: 0 30px;
    }
  `}

  label {
    text-transform: uppercase;
  }
`;

export const StyledButtonArea = styled.div`
  display: grid;
  justify-content: end;

  label {
    text-transform: uppercase;
  }

  button {
    font-weight: bold;
    text-transform: uppercase;
  }

  ${media.tablet`
    grid-template-columns: 1fr;
    grid-gap: 10px;
    grid-template-rows: auto auto;
  `}
`;
