import styled from 'styled-components';
import { media } from '../../../../utils/styling';

const StyledPage = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 10px;

  .row {
    width: 100%;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr;

    ${media.tablet`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto;
    `}
  }
`;

export default StyledPage;
