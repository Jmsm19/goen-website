import styled from 'styled-components';

const StyledNavSection = styled.div`
  &.route-section {
    margin: 20px 0 20px 0;

    .links {
      margin-top: 10px;

      a {
        width: max-content;
        padding: 0 15px;

        &:not(:last-child) {
          margin-bottom: 5px;
        }
      }
    }
  }
`;

export default StyledNavSection;
