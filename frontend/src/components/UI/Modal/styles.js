import React from 'react';
import styled from 'styled-components';
import { X } from 'styled-icons/feather/X';

import { FadeInBackdrop } from './animations';

export const StyledModal = styled(({ isMobile, ...props }) => <FadeInBackdrop {...props} />)`
  &.backdrop {
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(67, 67, 67, 0.7);

    .modal {
      position: relative;
      background: #fff;
      box-shadow: var(--drop-shadow);
      border-radius: 0.375rem;
      min-height: 200px;
      min-width: 50%;
      padding: 1.5rem;

      z-index: 1;
      width: 80vw;
      height: 80vh;

      ${({ isMobile }) =>
        isMobile &&
        `
        width: 100vw;
        height: 100vh;
        border-radius: 0;
      `}

      display: grid;
      grid-template-areas:
        'header'
        'content'
        'footer';
      grid-template-rows: auto 1fr auto;

      .modal-header {
        grid-area: 'header';
      }
      .modal-content {
        grid-area: 'content';
      }
      .modal-footer {
        grid-area: 'footer';
      }
    }
  }
`;

export const StyledCloseBtn = styled(X)`
  &.close-btn {
    width: 3rem;
    position: absolute;
    top: 0.25rem;
    right: 0.5rem;

    color: #343434;
    opacity: 0.6;

    &:hover {
      cursor: pointer;
      color: var(--primary-color);
      opacity: 1;
    }
  }
`;
