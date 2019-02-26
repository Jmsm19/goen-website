import styled from 'styled-components';
import { media } from '../../../utils/styling';

const StyledPage = styled.main`
  margin-bottom: 30px;

  ${media.tablet`
    padding: 0 15px;
  `}

  .settings-area {
    padding: 0 100px;

    ${media.tablet`
      padding: 0;
    `}
  }
`;

export default StyledPage;
