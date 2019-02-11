import styled from 'styled-components';
import { media } from '../../../utils/styling';

export const StyledModulesGrid = styled.div`
  display: grid;
  margin: 30px 0;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, max-content));
  max-height: 500px;
  overflow-y: auto;

  ${media.desktop`
    justify-content: center;
  `}

  ${media.tablet`
    grid-gap: 5px;
  `}

  ${media.phone`
    grid-template-columns: repeat(auto, minmax(300px, max-content));
  `}
`;

export const StyledPageContent = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  padding: 0 30px 0;

  ${media.tablet`
    padding: 15px 20px 0;
  `}
`;
