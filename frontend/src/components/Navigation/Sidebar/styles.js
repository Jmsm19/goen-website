import styled from 'styled-components';

import { AnimatedBackdrop, AnimatedSidebar } from './animations';

const StyledSidebar = styled(AnimatedSidebar)`
  &.sidebar {
    z-index: 1;

    height: 92vh;
    width: 100%;

    &.mobile {
      height: 100vh;
      position: absolute;
      top: 0;

      .side-nav {
        position: relative;
        top: 0;
        left: 0;
      }
    }
  }
`;

export const StyledNav = styled.nav`
  &.side-nav {
    z-index: 1;
    position: static;

    overflow: auto;
    height: inherit;
    width: 100%;
    min-width: 220px;
    padding: 1rem;
    padding-right: 1.3rem;

    border: 0;

    color: rgba(255, 255, 255, 0.7);
    background-color: var(--black);

    @media screen and (max-width: 768px) {
      width: 70%;
      max-width: 100vw;
    }

    .logout-btn {
      color: inherit;
      padding: 0;
      margin: 0.67em 0;
      letter-spacing: normal;
      font-weight: 400;

      &:hover {
        color: #fff;
        cursor: pointer;
      }
    }

    a {
      color: inherit;
      display: block;
      transition: all ease;
      margin: 15px 0;

      &.active {
        color: #fff;
        font-weight: 600;
      }

      &:hover {
        color: #fff;
      }
    }
  }
`;

export const StyledBackdrop = styled(AnimatedBackdrop)`
  &.backdrop {
    content: ' ';
    height: 100%;
    width: 100%;

    position: absolute;
    top: 0;

    background-color: rgba(67, 67, 67, 0.4);
  }
`;

export default StyledSidebar;
