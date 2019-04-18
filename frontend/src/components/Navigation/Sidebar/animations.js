import posed from 'react-pose';

export const AnimatedSidebar = posed.nav({
  open: {
    x: 0,
    transition: 'ease',
  },
  closed: {
    x: '-150%',
    transition: 'ease',
  },
});

export const AnimatedBackdrop = posed.div({
  open: {
    opacity: 0.6,
    delay: 220,
    transition: {
      duration: 200,
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0,
    },
  },
});
