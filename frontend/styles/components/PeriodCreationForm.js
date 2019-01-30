import styled from 'styled-components';
import { Form } from 'antd';
import media from '../../utils/styling';

const StyledForm = styled(Form)`
  .input-area {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
  }

  .button-area {
    display: flex;
    justify-content: flex-end;
  }

  ${media.tablet`
    .input-area {
      grid-template-columns: 1fr;
    }
  `}
`;

export default StyledForm;
