import styled from 'styled-components';

const StyledLayout = styled.div`
  &.dashboard-layout {
    position: relative;
    height: 100vh;
    width: 100vw;

    display: grid;
    grid-template-rows: 10vh 90vh;

    .top-navigation {
      width: 100%;

      color: #fff;
      background-color: var(--primary-color);
      padding: 15px 10px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      h1 {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .inner-layout {
      display: grid;
      grid-template-columns: auto 1fr;
    }

    .main-content {
      padding: 15px;
      overflow-y: auto;
    }
  }
`;

export default StyledLayout;
