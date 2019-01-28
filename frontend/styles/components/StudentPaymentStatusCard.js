import styled from 'styled-components';
import { Card } from 'antd';
import media from '../../utils/styling';

const StyledCard = styled(Card)`
  margin-top: 10px;
  width: max-content;

  ${media.tablet`
    width: 100vw;
  `}
`;

export default StyledCard;
