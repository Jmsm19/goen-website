import React from 'react';
import styled from 'styled-components';
import { LogOut, Menu } from 'styled-icons/feather';

export const StyledLayout = styled(({ isMobile, ...props }) => <div {...props} />)`
  &.dashboard-layout {
    position: relative;
    height: 100vh;
    width: 100vw;
    ${'' /* background-color: #f0f2f5; */}

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

      .right-nav {
        display: flex;
        flex-direction: row;
        justify-items: flex-end;
        align-items: center;

        .open-sidebar-btn,
        .logout-btn {
          letter-spacing: normal;
        }

        .open-sidebar-btn {
          border: none;
          padding: 10px;

          &:hover {
            background-color: transparent;
            transform: none;
            box-shadow: none;
          }
        }

        .logout-btn {
          color: #fff;

          &:not(:last-child) {
            margin-right: 10px;
          }
        }

        a {
          color: rgba(255, 255, 255, 0.7);
          padding: 15px;

          &:not(:last-child) {
            display: block;
            margin-right: 10px;
          }

          &.active {
            color: #fff;
            font-weight: 600;
          }

          &:hover {
            color: #fff;
          }
        }
      }
    }

    .inner-layout {
      display: grid;
      grid-template-columns: ${({ isMobile }) => (isMobile ? '1fr' : 'auto 1fr')};
    }

    .main-content {
      padding: 15px;
      overflow-y: auto;
      width: 100%;
    }
  }
`;

export const LogoutIcon = styled(LogOut)`
  color: #fff;
  font-weight: bold;
`;

export const MenuIcon = styled(Menu)`
  color: #fff;
  font-weight: bold;
`;
