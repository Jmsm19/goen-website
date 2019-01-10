const truepushSDK = document.createElement('script');
truepushSDK.setAttribute(
  'src',
  `https://app.truepush.com/sdk/app.js?key=5c3762e31818f4417b62e6bb&reload=${new Date().getTime()}`,
);
document.head.appendChild(truepushSDK);
