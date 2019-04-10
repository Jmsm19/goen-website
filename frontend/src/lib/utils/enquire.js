/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
let enquire;

// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82
if (typeof window !== 'undefined') {
  const matchMediaPolyfill = mediaQuery => ({
    media: mediaQuery,
    matches: false,
    addListener() {},
    removeListener() {},
  });
  window.matchMedia = window.matchMedia || matchMediaPolyfill;
  enquire = require('enquire.js'); // eslint-disable-line global-require
}

const mediaQuery = 'only screen and (max-width: 768px)';
const queryHandler = cb => ({
  match: () => {
    cb && cb(true);
  },
  unmatch: () => {
    cb && cb();
  },
});

export const enquireScreen = cb => {
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
