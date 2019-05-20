import React from 'react';

const useEffectOnce = (fn = () => () => undefined) => React.useEffect(fn, []);

export default useEffectOnce;
