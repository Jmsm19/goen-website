import styled from 'styled-components';
import { Card } from 'antd';

const StyledDualColCard = styled(Card)`
  height: 100%;

  .ant-card-body {
    padding: 0;
    height: 100%;
    display: grid;
    align-items: center;
    grid-template-columns: max-content 1fr;
    &:before,
    &:after {
      display: none;
    }
  }

  .first-col {
    padding-left: 20px;
    height: 100%;
    display: flex;
    align-items: center;

    img {
      --size: 120px;
      width: var(--size);
      height: var(--size);
    }
  }

  .second-col {
    padding: 10px;
    overflow-x: hidden;
    white-space: nowrap;

    p,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
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

export default StyledDualColCard;
