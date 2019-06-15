/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
let enquire: any;

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string) => ({
    media: mediaQuery,
    matches: false,
    addListener() {},
    removeListener() {},
  });
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  enquire = require('enquire.js'); // eslint-disable-line global-require
}

const mediaQuery = 'only screen and (max-width: 960px)';
const queryHandler = (cb: Function | undefined) => ({
  match: () => {
    cb && cb(true);
  },
  unmatch: () => {
    cb && cb();
  },
});

export const enquireScreen = (cb: Function) => {
  if (!enquire) {
    return;
  }
  // and (min-width: 320px)
  enquire.register(mediaQuery, queryHandler(cb));
};

export const StopEnquireScreen = () => {
  if (!enquire) {
    return;
  }

  enquire.unregister(mediaQuery);
};
