import styled from 'styled-components';
import media from '../../utils/styling';
import CardWithtabs from '../../components/CardWithTabs';

const StyledCard = styled(CardWithtabs)`
  ${media.tablet`
    width: 100vw;
  `}

  .ant-table-placeholder {
    border: none;
  }
`;

export default StyledCard;
