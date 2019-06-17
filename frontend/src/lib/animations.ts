// eslint-disable-next-line import/prefer-default-export
export const SlideUpTransition = {
  from: {
    opacity: 0,
    position: 'absolute',
    transform: 'translate3d(0, 50px, 0)',
  },
  enter: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  leave: {
    opacity: 0,
    transform: 'translate3d(0, 50px, 0)',
  },
};
