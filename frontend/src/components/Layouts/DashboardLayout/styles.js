import React from 'react';
import styled from 'styled-components';
import { Menu } from 'styled-icons/material/Menu';

export const StyledLayout = styled(({ isMobile, ...props }) => <div {...props} />)`
  &.dashboard-layout {
    position: relative;
    height: 100vh;
    width: 100vw;

    display: grid;
    grid-template-rows: 70px 1fr;

    .top-navigation {
      width: 100%;

      color: #fff;
      background-color: var(--primary-color);
      padding: 15px 10px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .site-title {
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
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
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);

          &:hover {
            transform: none;
            box-shadow: none;
            color: #fff;
          }

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
      grid-template-columns: ${({ isMobile }) => (isMobile ? '1fr' : '240px 1fr')};
      overflow-y: auto;
    }

    .main-content {
      padding: 15px;
      overflow-y: auto;
      width: 100%;
    }
  }
`;

export const MenuIcon = styled(Menu)`
  color: #fff;
  font-weight: bold;
`;
