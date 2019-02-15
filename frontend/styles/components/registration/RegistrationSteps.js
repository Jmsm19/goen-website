import styled from 'styled-components';
import { Steps } from 'antd';
import { media } from '../../../utils/styling';

const StyledSteps = styled(Steps)`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;

  ${media.tablet`
    display: none !important;
  `}
`;

export default StyledSteps;
