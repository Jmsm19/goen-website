import React from 'react';
import styled from 'styled-components';

const StyledPage = styled(({ isMobile, ...props }) => <div {...props} />)`
  &.periods-page {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;

    h1 {
      margin-bottom: 1.5rem;
    }

    section {
      display: grid;

      .period-search-area {
        margin-bottom: 1rem;
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(
          auto-fit,
          minmax(260px, ${({ isMobile }) => (isMobile ? '1fr' : 'max-content')})
        );
        grid-template-rows: 1fr;
        justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'space-between')};
        align-items: center;

        .period-filter {
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: auto 1fr;
          align-items: center;

          .selector {
            max-width: ${({ isMobile }) => (isMobile ? '100%' : null)};
          }
        }
      }
    }
  }
`;

export default StyledPage;
