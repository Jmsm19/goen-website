import styled from 'styled-components';
import { Card } from 'antd';
import media from '../../utils/styling';

const StyledCard = styled(Card)`
  ${media.tablet`
    width: 100vw;
  `}

  .ant-table-placeholder {
    border: none;
  }
`;

export default StyledCard;
