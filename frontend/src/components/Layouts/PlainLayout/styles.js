import styled from 'styled-components';

const StyledLayout = styled.div`
  &.layout {
    position: relative;
    z-index: 0;
    height: 100%;
    background-color: var(--primary-color);

    display: grid;
    grid-template:
      'main' 1fr
      'footer' auto;

    &:after {
      content: ' ';
      z-index: -1;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #232323;
      clip-path: polygon(0% 0%, 100% 0%, 100% 30%, 0% 60%);
    }

    main {
      grid-area: 'main';
    }

    footer {
      color: #fff;
      grid-area: 'footer';
      text-align: center;
      padding: 30px;
    }
  }
`;

export default StyledLayout;
