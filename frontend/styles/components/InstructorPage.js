/* eslint-disable react/react-in-jsx-scope */
import styled from 'styled-components';
import { Button, Card, Input } from 'antd';
import { media } from '../../utils/styling';

export const StyledPage = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  grid-gap: 20px;
  height: 100%;

  .button-area {
    display: flex;
    flex-wrap: wrap;

    button {
      flex: 1;
      margin: 10px;
    }
  }

  ${media.tablet`
    padding: 0 20px;
  `}
`;

export const InstructorsArea = styled(({ loading, ...rest }) => <div {...rest} />)`
  display: grid;
  grid-gap: 15px;
  grid-auto-rows: 100px;
  overflow-y: auto;
  grid-template-columns: repeat(auto-fit, minmax(300px, calc(33.5555% - 15px)));

  @media screen and (max-width: 1253px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, calc(50% - 15px)));
  }

  @media screen and (max-width: 945px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, calc(100% - 15px)));
  }

  ${({ loading }) =>
    loading &&
    `
      grid-template-columns: 1fr;
      height: 100%;
      align-content: center;
    `}
`;

export const StyledButtonCard = styled(Button)`
  height: 60px;
  font-family: 'Lato', sans-serif;
  font-size: 1.3rem;
  font-weight: 400;
  color: var(--primary-color);
  border-color: var(--primary-color);
`;

export const StyledInstructorCard = styled(Card)`
  height: 100%;

  button {
    font-size: 2rem;
    position: absolute;
    overflow: hidden;
    width: 0;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0;
    text-transform: uppercase;
    color: var(--normal-color);
    border: none;
    background-color: var(--light-obscure-primary-color);
    transition: width 0.5s ease-in-out;
  }

  &:hover {
    cursor: default;

    button {
      cursor: pointer;
      width: 20%;
    }
  }

  .ant-card-body {
    padding: 0;
    height: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: 110px auto;
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

    .GOEN {
      padding: 10px 15px 10px 0;
    }
  }

  .right {
    padding: 10px;
    overflow-x: hidden;
    white-space: nowrap;

    p,
    h4 {
      overflow-x: hidden;
      white-space: nowrap;
      width: 100%;
      text-overflow: ellipsis;
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

export const StyledModalContent = styled.div`
  padding: 20px;
`;
