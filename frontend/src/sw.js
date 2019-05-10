/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
if (typeof importScripts === 'function') {
  // eslint-disable-next-line no-undef
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules */
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    // Cache images
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          }),
        ],
      }),
    );

    // Cache main files
    workbox.routing.registerRoute(/\.(?:js|css|html)$/, new workbox.strategies.NetworkFirst());

    // Cache main route
    workbox.routing.registerRoute('/', new workbox.strategies.NetworkFirst());

    // Cache settings files
    workbox.routing.registerRoute('/api/settings', new workbox.strategies.NetworkFirst());

    // Cache translation files
    const pluginConfig = {
      maxEntries: 1,
      maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
    };

    workbox.routing.registerRoute(
      /\/locales\//,
      new workbox.strategies.NetworkFirst({
        cacheName: 'translations',
        plugins: [
          new workbox.expiration.Plugin({
            ...pluginConfig,
            maxEntries: 3,
          }),
        ],
      }),
    );

    // Cache auth user route
    workbox.routing.registerRoute(
      '/api/auth/user',
      new workbox.strategies.NetworkFirst({
        cacheName: 'auth-user',
        plugins: [new workbox.expiration.Plugin(pluginConfig)],
      }),
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
