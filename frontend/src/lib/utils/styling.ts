interface MediaQuery {
  desktop: string;
  tablet: string;
  phone: string;
}

const sizes = {
  desktop: 1280,
  tablet: 960,
  phone: 600,
};

// @ts-ignore
const mediaQ: MediaQuery = Object.keys(sizes).reduce((acc, label) => {
  // @ts-ignore
  acc[label] = `@media screen and (max-width: ${sizes[label]}px)`;
  return acc;
}, {});

export default mediaQ;
