import React from 'react';

const useDebounce = (value: any, delay = 500) => {
  const [debounceValue, setDebounceValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [delay, value]);

  return debounceValue;
};

export default useDebounce;
