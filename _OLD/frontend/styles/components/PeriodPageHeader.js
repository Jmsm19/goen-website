import styled from 'styled-components';
import { Card } from 'antd';
import { media } from '../../utils/styling';

const StyledHeaderCard = styled(Card)`
  .ant-card-head-title {
    font-size: 1rem;
  }

  .ant-card-body {
    &:before,
    &:after {
      display: none;
    }

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
    grid-gap: 10px;
    justify-content: flex-start;

    ${media.phone`
      grid-template-columns: 1fr;
    `}
  }
`;

export default StyledHeaderCard;
