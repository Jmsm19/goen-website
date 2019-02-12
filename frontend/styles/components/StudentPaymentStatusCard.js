import styled from 'styled-components';
import { media } from '../../utils/styling';
import CardWithTabs from '../../components/Cards/CardWithTabs';

const StyledCard = styled(CardWithTabs)`
  ${media.tablet`
    width: 100vw;
  `}

  .ant-table-placeholder {
    border: none;
  }
`;

export default StyledCard;
