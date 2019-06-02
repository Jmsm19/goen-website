import { styled } from '@material-ui/styles';

import { AnimatedBackdrop, AnimatedSidebar } from './animations';

const StyledSidebar = styled(AnimatedSidebar)({
  '&.sidebar': {
    zIndex: 1,

    height: 'calc(100vh - 70px)',
    width: '100%',

    '&.mobile': {
      height: '100vh',
      position: 'absolute',
      top: 0,

      '& .side-nav': {
        position: 'relative',
        top: 0,
        left: 0,
      },
    },
  },
});

export const StyledNav = styled('nav')({
  '&.side-nav': {
    zIndex: 1,
    position: 'static',

    overflow: 'auto',
    height: 'inherit',
    width: '100%',
    minWidth: 220,
    padding: '1rem',
    paddingRight: '1.3rem',

    border: 0,

    color: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'var(--black)',

    '@media screen and (max-width: 768px)': {
      width: '70%',
      maxWidth: '100vw',
    },

    '& .logout-btn': {
      color: 'inherit',
      padding: 0,
      margin: '0.67em 0',
      letterSpacing: 'normal',
      fontWeight: 400,

      '&:hover': {
        color: '#fff',
        cursor: 'pointer',
      },
    },

    '& a': {
      color: 'inherit',
      display: 'block',
      transition: 'all ease',
      margin: '15px 0',

      '&.active': {
        color: '#fff',
        fontWeight: 600,
      },

      '&:hover': {
        color: '#fff',
      },
    },
  },
});

export const StyledBackdrop = styled(AnimatedBackdrop)({
  '&.backdrop': {
    height: '100%',
    width: '100%',

    position: 'absolute',
    top: 0,

    backgroundColor: 'rgba(67, 67, 67, 0.4)',
  },
});

export default StyledSidebar;
