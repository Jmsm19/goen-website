import styled from 'styled-components';
import { Form } from 'antd';
import media from '../../utils/styling';

export const StyledForm = styled(Form)`
  label {
    text-transform: uppercase;
  }
`;

export const StyledButtonArea = styled.div`
  display: grid;
  justify-content: end;
  grid-template-columns: repeat(2, minmax(max-content, 200px));
  grid-template-rows: auto;

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
