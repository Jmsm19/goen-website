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

      z-index: 1;
      width: ${({ isMobile }) => (isMobile ? '100%' : 'max-content')};
      max-width: ${({ isMobile }) => (isMobile ? '95vw' : '80vw')};
      height: max-content;
      max-height: ${({ isMobile }) => (isMobile ? '95vh' : '80vh')};

      display: grid;
      grid-template-areas:
        'header'
        'content'
        'footer';
      grid-template-rows: 50px 1fr auto;

      .modal-header {
        grid-area: 'header';
        padding: 1rem;
      }
      .modal-content {
        grid-area: 'content';
        padding: ${({ isMobile }) => (isMobile ? '1rem' : '1.5rem')};
        padding-top: 0;
        overflow-y: auto;
      }
      .modal-footer {
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
