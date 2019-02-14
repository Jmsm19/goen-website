/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';
import { Button, Card, Input } from 'antd';
import { media } from '../../utils/styling';

export const StyledPage = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;

  ${media.tablet`
    padding: 0 20px;
  `}
`;

export const InstructorsArea = styled(({ loading, ...rest }) => <div {...rest} />)`
  margin-top: 20px;
  display: grid;
  grid-gap: 15px;
  grid-auto-rows: 100px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 390px));

  ${({ loading }) =>
    loading &&
    `
      grid-template-columns: 1fr;
      height: 100%;
      align-content: center;
    `}
`;

export const StyledButtonCard = styled(Button)`
  height: 100%;
  font-family: 'Lato', sans-serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--primary-color);
  border-color: var(--primary-color);
`;

export const StyledInstructorCard = styled(Card)`
  height: 100%;

  .ant-card-body {
    padding: 0;
    height: 100%;
    display: grid;
    align-items: center;
    grid-gap: 20px;
    grid-template-columns: auto 1fr;

    &:before,
    &:after {
      display: none;
    }
  }

  .left {
    padding-left: 20px;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      width: 90px;
      height: 90px;
    }
  }

  .right {
    padding: 10px;
    p,
    h4 {
      margin: 0;
    }

    h4 {
      font-size: 1.1rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;

export const StyledSearchInput = styled(Input.Search)`
  input {
    padding: 20px;
    font-size: 1.2rem;
  }
`;
