import styled from 'styled-components';

import { FadeInTable } from './animations';

export const StyledTableWrapper = styled.div`
  overflow-x: auto;
  padding: 0 2px;
  position: relative;
  min-height: 200px;

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(244, 244, 244, 0.6);

    .loading {
      svg {
        height: 40px;
      }
    }
  }
`;

export const StyledTable = styled(FadeInTable)`
  &.table {
    width: 100%;
    color: var(---light-black);
    background: transparent;
    border-collapse: separate;
    border-spacing: 0 10px;
    text-align: left;

    .table-head {
      .table-head-row {
        border-top: 1px solid #e9ecef;
        border-bottom: 1px solid #e9ecef;

        .table-head-row-item {
          color: rgba(67, 67, 67, 0.6);
          text-align: inherit;
          font-size: 0.65rem;
          font-weight: 600;
          white-space: nowrap;
          vertical-align: middle;
          padding: 0.65rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
      }
    }

    .table-body {
      --border-radius: 0.375rem;
      font-weight: 400;
      line-height: 1.5;
      text-align: inherit;

      .table-body-row {
        background: #fff;
        border-top: 1px solid #e9ecef;
        border-radius: var(--border-radius);
        box-shadow: 0 1px 3px rgba(50, 50, 93, 0.15), 0 1px 0 rgba(0, 0, 0, 0.02);

        &:hover {
          box-shadow: none;

          .table-body-row-item {
            --border: 1px solid var(--primary-color);
            border-top: var(--border);
            border-bottom: var(--border);

            &:first-child {
              border-left: var(--border);
            }
            &:last-child {
              border-right: var(--border);
            }
          }
        }

        .table-body-row-item {
          padding: 0.65rem;
          font-size: 0.8125rem;
          vertical-align: middle;
          white-space: nowrap;
          border-top: 1px solid transparent;
          border-bottom: 1px solid transparent;

          &:first-child {
            border-right: none;
            border-left: 1px solid transparent;
            border-top-left-radius: var(--border-radius);
            border-bottom-left-radius: var(--border-radius);
          }

          &:last-child {
            border-left: none;
            border-right: 1px solid transparent;
            border-top-right-radius: var(--border-radius);
            border-bottom-right-radius: var(--border-radius);
          }

          a:link,
          a:visited {
            width: 100%;
            display: inline-block;
            color: rgba(67, 67, 67, 0.6);

            &:hover {
              color: var(--primary-color);
            }
          }
        }
      }
    }
  }
`;
