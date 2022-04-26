if (!self.define) {
  let e,
    s = {};
  const n = (n, i) => (
    (n = new URL(n + '.js', i).href),
    s[n] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = n), (e.onload = s), document.head.appendChild(e);
        } else (e = n), importScripts(n), s();
      }).then(() => {
        let e = s[n];
        if (!e) throw new Error(`Module ${n} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, a) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (s[t]) return;
    let c = {};
    const r = (e) => n(e, t),
      o = { module: { uri: t }, exports: c, require: r };
    s[t] = Promise.all(i.map((e) => o[e] || r(e))).then((e) => (a(...e), c));
  };
}
define(['./workbox-6316bd60'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/-GkwlBs27qIyg-treif0s/_buildManifest.js',
          revision: '49b96bb645715bd3bca5f5208797469f',
        },
        {
          url: '/_next/static/-GkwlBs27qIyg-treif0s/_middlewareManifest.js',
          revision: 'fb2823d66b3e778e04a3f681d0d2fb19',
        },
        {
          url: '/_next/static/-GkwlBs27qIyg-treif0s/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/440-eaa3df660895de3d.js',
          revision: 'eaa3df660895de3d',
        },
        {
          url: '/_next/static/chunks/framework-fc97f3f1282ce3ed.js',
          revision: 'fc97f3f1282ce3ed',
        },
        {
          url: '/_next/static/chunks/main-1c75b2a932ea3332.js',
          revision: '1c75b2a932ea3332',
        },
        {
          url: '/_next/static/chunks/pages/_app-46e2946ce65c5ae1.js',
          revision: '46e2946ce65c5ae1',
        },
        {
          url: '/_next/static/chunks/pages/_error-1995526792b513b2.js',
          revision: '1995526792b513b2',
        },
        {
          url: '/_next/static/chunks/pages/index-95f95c587df9f7ba.js',
          revision: '95f95c587df9f7ba',
        },
        {
          url: '/_next/static/chunks/polyfills-5cd94c89d3acac5f.js',
          revision: '99442aec5788bccac9b2f0ead2afdd6b',
        },
        {
          url: '/_next/static/chunks/webpack-d7b038a63b619762.js',
          revision: 'd7b038a63b619762',
        },
        {
          url: '/_next/static/css/5916cc3f99d1336a.css',
          revision: '5916cc3f99d1336a',
        },
        {
          url: '/android-chrome-192x192.png',
          revision: '2a5c926faa83fe397584b06429e26e86',
        },
        {
          url: '/android-chrome-512x512.png',
          revision: 'be9e1489531fa830f311567900f5d271',
        },
        {
          url: '/apple-touch-icon.png',
          revision: '670d9f1884838c64f84fb1f38cbcefc1',
        },
        {
          url: '/browserconfig.xml',
          revision: 'a493ba0aa0b8ec8068d786d7248bb92c',
        },
        {
          url: '/favicon-16x16.png',
          revision: '1e87b23b54b1d58c871b398fd329aba6',
        },
        {
          url: '/favicon-32x32.png',
          revision: '8e78bb1b537c51d577fe0180951bdf86',
        },
        { url: '/favicon.ico', revision: '0f3637f4510b16818fd60932a7de7a12' },
        {
          url: '/icon-192x192.png',
          revision: '5f1860aea1534439b914b126cadcbbb7',
        },
        {
          url: '/icon-256x256.png',
          revision: '2859f319aa9d84fbab20f440de47ff79',
        },
        {
          url: '/icon-384x384.png',
          revision: '4e428b09b8e1be2338ab84c3e3c5d68f',
        },
        {
          url: '/icon-512x512.png',
          revision: 'b5c4020598e2201f93cfd31cd5744b83',
        },
        { url: '/manifest.json', revision: '15fe280d9b4e1315ec8976b60dd4e557' },
        {
          url: '/mstile-150x150.png',
          revision: '1cdb12e60710655ee0ff3f5bdeee89e2',
        },
        {
          url: '/safari-pinned-tab.svg',
          revision: '5956efbd0bd1830f5b27ff807dc29084',
        },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: i,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET',
    );
});
