import React from 'react';
import styled from 'styled-components';
import { Close as X } from 'styled-icons/evil/Close';

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

    .portal-modal {
      z-index: 1;
      position: relative;
      background: #fff;
      box-shadow: var(--drop-shadow);
      border-radius: 0.375rem;

      min-width: max-content;
      max-width: ${({ isMobile }) => (isMobile ? '95vw' : '80vw')};

      height: max-content;
      max-height: ${({ isMobile }) => (isMobile ? '95vh' : '80vh')};

      display: grid;
      grid-template-areas:
        'header'
        'content'
        'footer';
      grid-template-rows: 50px 1fr auto;

      .portal-modal-header {
        grid-area: 'header';
        padding: 1rem;
      }
      .portal-modal-content {
        grid-area: 'content';
        padding: ${({ isMobile }) => (isMobile ? '1rem' : '1.5rem')};
        padding-top: 0;
        overflow-y: auto;
      }
      .portal-modal-footer {
        grid-area: 'footer';
        padding: 1rem;
      }
    }
  }
`;

export const StyledCloseBtn = styled(X)`
  &.close-btn {
    width: 3rem;
    position: absolute;
    top: 0.5rem;
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
