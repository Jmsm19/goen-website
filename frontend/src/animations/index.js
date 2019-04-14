/**
 * Returns an object to be used by react-pose to create a SlideUp animation
 *
 * @param {{}} [extendEnter={}]
 * @param {{}} [extendExit={}]
 * @param {{}} [moreOptions={}]
 */
export const SlideUp = (extendEnter = {}, extendExit = {}, moreOptions = {}) => ({
  enter: { y: 0, opacity: 1, delay: 200, ...extendEnter },
  exit: { y: 50, opacity: 0, ...extendExit },
  ...moreOptions,
});

/**
 * Returns an object to be used by react-pose to create a SlideDown animation
 *
 * @param {{}} [extendEnter={}]
 * @param {{}} [extendExit={}]
 * @param {{}} [moreOptions={}]
 */
export const SlideDown = (extendEnter = {}, extendExit = {}, moreOptions = {}) => ({
  enter: { y: 0, opacity: 1, delay: 200, ...extendEnter },
  exit: { y: -50, opacity: 0, ...extendExit },
  ...moreOptions,
});

/**
 * Returns an object to be used by react-pose to create a SlideRight animation
 *
 * @param {{}} [extendEnter={}]
 * @param {{}} [extendExit={}]
 * @param {{}} [moreOptions={}]
 */
export const SlideRight = (extendEnter = {}, extendExit = {}, moreOptions = {}) => ({
  enter: { x: 0, opacity: 1, delay: 200, ...extendEnter },
  exit: { x: -300, opacity: 0, ...extendExit },
  ...moreOptions,
});

/**
 * Returns an object to be used by react-pose to create a FadeIn animation
 *
 * @param {{}} [extendEnter={}]
 * @param {{}} [extendExit={}]
 * @param {{}} [moreOptions={}]
 */
export const FadeIn = (extendEnter = {}, extendExit = {}, moreOptions = {}) => ({
  enter: { opacity: 1, ...extendEnter },
  exit: { opacity: 0, ...extendExit },
  ...moreOptions,
});
