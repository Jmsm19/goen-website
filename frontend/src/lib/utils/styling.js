const sizes = {
  desktop: 1280,
  tablet: 960,
  phone: 600,
};

const mediaQ = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = `@media screen and (max-width: ${sizes[label]}px)`;
  return acc;
}, {});

export default mediaQ;
