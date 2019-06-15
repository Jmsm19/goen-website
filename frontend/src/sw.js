/* eslint-disable no-useless-escape */
/* eslint-disable no-console */
const daysToSeconds = days => days * 24 * 60 * 60;

if (typeof importScripts === 'function') {
  // eslint-disable-next-line no-undef
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');
  /* global workbox */
  if (workbox) {
    console.log('Workbox is loaded');
    const networkFirst = config => new workbox.strategies.NetworkFirst(config);
    const cacheFirst = config => new workbox.strategies.CacheFirst(config);

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([]);

    /* custom cache rules */
    workbox.routing.registerNavigationRoute('/index.html', {
      blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/],
    });

    // Cache images
    workbox.routing.registerRoute(
      /\.(?:png|gif|jpg|jpeg)$/,
      cacheFirst({
        cacheName: 'images',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: daysToSeconds(30), // 30 Days
          }),
        ],
      }),
    );

    // Cache main files
    workbox.routing.registerRoute(/\.(?:js|css|html)$/, networkFirst());

    // Cache main route
    workbox.routing.registerRoute('/', networkFirst());

    // Cache settings files
    workbox.routing.registerRoute(
      '/api/settings',
      networkFirst({
        cacheName: 'settings',
      }),
    );

    // Cache data requests
    const cacheConfig = {
      cacheName: 'Data requests',
    };
    workbox.routing.registerRoute('/api/periods', networkFirst(cacheConfig));
    workbox.routing.registerRoute('/api/modules', networkFirst(cacheConfig));
    workbox.routing.registerRoute('/api/users', networkFirst(cacheConfig));
    workbox.routing.registerRoute('/api/periods/active', networkFirst(cacheConfig));
    workbox.routing.registerRoute(/(\/api\/periods\/)\w+(\/modules)$/, networkFirst(cacheConfig));

    // Cache translations
    workbox.routing.registerRoute(
      /\/locales\//,
      networkFirst({
        cacheName: 'translations',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 3,
            maxAgeSeconds: daysToSeconds(7),
          }),
        ],
      }),
    );

    // Cache auth user route
    workbox.routing.registerRoute(
      '/api/auth/user',
      networkFirst({
        cacheName: 'auth-user',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 1,
            maxAgeSeconds: daysToSeconds(7),
          }),
        ],
      }),
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}
