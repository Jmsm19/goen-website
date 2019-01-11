import styled from 'styled-components';
import { Card, Steps } from 'antd';
import media from '../../utils/styling';

export const StyledPage = styled.div`
  display: grid;
  max-width: 1500px;
  margin: 0 auto;
`;

export const StyledModulesGrid = styled.div`
  display: grid;
  margin: 30px auto 0;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(300px, max-content));

  ${media.tablet`
    grid-gap: 5px;
  `}
`;

export const StyledModuleCard = styled(Card)`
  margin-bottom: 15px;
`;

export const StyledSteps = styled(Steps)`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;

  ${media.tablet`
    padding: 10px 10px 0;

    .ant-steps-item {
      display: inline-block !important;
      margin-right: 8px !important;
      width: max-content !important;

      &:last-child {
        margin-right: 0px !important;
      }
    }

  `}
`;

export const StyledPageContent = styled.div`
  padding: 0 30px 0;
`;
