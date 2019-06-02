const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 576,
};

const mediaQ = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = `@media screen and (max-width: ${sizes[label]}px)`;
  return acc;
}, {});

export default mediaQ;
