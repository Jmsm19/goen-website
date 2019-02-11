import styled from 'styled-components';
import { Card } from 'antd';
import { media } from '../../utils/styling';

export const SectionTitle = styled.h1`
  padding-left: 15px;
`;

export const StyledCard = styled(Card)`
  min-width: 900px;
  width: 100%;
  max-width: 80vw;
  margin-bottom: 30px;

  &:first-child {
    border-top: 0;

    .ant-card-body {
      padding-top: 0px;
    }
  }

  ${media.tablet`
    min-width: 100%;
    margin-bottom: 15px;
    border-right: 0;
    border-left: 0;
  `}
`;

export const StyledProfile = styled.div`
  display: grid;
  justify-content: center;

  ${media.tablet`
    justify-content: initial;
  `}
`;

export const UserProfileUpper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr auto;
  padding-top: 20px;

  div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ${media.tablet`
    grid-template-columns: 1fr;

    div:first-child {
      padding-bottom: 10px;
    }
  `}
`;

export const UserUpperFirstCol = styled.div`
  ${media.tablet`
    text-align: center;
  `}
`;

export const UserUpperSecondCol = styled.div`
  padding-top: 30px;
  padding-left: 30px;

  h1 {
    font-weight: bold;
  }

  h2:last-child {
    margin-bottom: 0;
  }

  ${media.tablet`
    padding: 0;
    font-size: 0.6rem;

    h1 {
      text-align: center;
    }

    h2:last-child {
      margin-bottom: 10.5px;
    }
  `}
`;

export const UserUpperThirdCol = styled.div`
  display: grid;
  align-items: end;
`;

export const UserProfileLower = styled.div``;
