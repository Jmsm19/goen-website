import styled from 'styled-components';

const StyledNavSection = styled.div`
  &.route-section {
    margin: 15px 0 30px 0;

    .section-title {
      color: rgba(255, 255, 255, 0.7);
      user-select: none;
    }

    .links {
      margin-top: 10px;

      a {
        width: max-content;
        padding: 0 10px;

        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
    }
  }
`;

export default StyledNavSection;
