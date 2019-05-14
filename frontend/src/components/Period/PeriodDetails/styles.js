import styled from 'styled-components';
import media from '../../../lib/utils/styling';

import HeaderSection from './HeaderSection';
import SummarySection from './SummarySection';
import ModulesSection from './ModulesSection';

export const StyledContainer = styled.div`
  .section-title {
    margin-bottom: 1rem;

    &:not(:first-child) {
      font-size: 1.2rem;
      padding: 0 1rem;
    }
  }

  section {
    &:not(:last-child) {
      margin-bottom: 2rem;
    }

    .card-body {
      padding: 1rem;
    }

    &.summary-section,
    &.modules-section {
      display: grid;
      padding: 0 1rem;
    }
  }
`;

export const StyledHeaderSection = styled(HeaderSection)`
  &.details-header {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(320px, max-content));
    justify-content: space-between;
    align-items: center;

    ${media.tablet`
      grid-template-columns: 1fr;
    `}

    @media screen and (max-width: 950px) {
      grid-template-columns: 1fr;
    }

    .period-name {
      margin-bottom: 10px;
    }

    .btn-area {
      display: grid;
      grid-gap: 1rem;
      grid-template-columns: repeat(2, max-content);
    }

    .card {
      ${media.tablet`
      width: 100%;
      `}

      .card-body {
        text-align: center;
        padding: 0.725rem;
        letter-spacing: 1px;
      }

      .card-title {
        color: #fff;
        margin: 0;
      }

      p {
        color: #fff;
        opacity: 0.85;
      }

      &.period-open {
        background-color: var(--info-color);
        border-color: var(--info-color);
      }

      &.period-closed {
        background-color: var(--danger-color);
        border-color: var(--danger-color);
      }
    }
  }
`;

export const StyledModulesSection = styled(ModulesSection)`
  &.modules-section {
    margin-top: 30px;
    margin-bottom: 30px;
    grid-gap: 30px 20px;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));

    ${media.tablet`
    grid-template-columns: 1fr;
    `}
  }
`;

export const StyledSummarySection = styled(SummarySection)`
  &.summary-section {
    grid-template-columns: repeat(auto-fit, minmax(250px, max-content));

    .card {
      background-color: transparent;
      border: none;

      &:not(:last-child) {
        margin-bottom: 10px;
      }

      .card-body {
        padding: 0;
      }
    }
  }
`;