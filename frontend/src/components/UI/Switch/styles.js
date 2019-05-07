import styled from 'styled-components';

export const StyledSwitch = styled.div`
  &.switch {
    --switch-size: 28px;
    position: relative;
    height: var(--switch-size);
    width: calc(var(--switch-size) * 2);
    border-radius: calc(var(--switch-size) / 2);
    padding: 2px;
    transition: background-color 300ms ease;
    box-shadow: var(--input-box-shadow);

    &.switch-on:not(.disabled) {
      background-color: var(--primary-color);
    }

    &.switch-off,
    &.disabled {
      background-color: #ccc;
    }

    &:hover {
      cursor: pointer;

      &.disabled {
        cursor: not-allowed;
      }
    }
  }
`;

export const StyledBall = styled.span`
  &.ball {
    --ball-spacing: 2px;
    --ball-size: calc(var(--switch-size) - var(--ball-spacing));

    content: ' ';
    height: var(--ball-size);
    width: var(--ball-size);
    position: absolute;
    top: calc(var(--ball-spacing) / 2);
    background-color: #fff;
    border: var(--light-primary-color);
    border-radius: 50%;
    will-change: transform;
    transition: transform 300ms ease;

    &.ball-left {
      left: calc(var(--ball-spacing) / 2);
      transform: translateX(0);
    }

    &.ball-right:not(.disabled) {
      transform: translateX(calc(var(--ball-size) + var(--ball-spacing) / 2));
    }
  }
`;
