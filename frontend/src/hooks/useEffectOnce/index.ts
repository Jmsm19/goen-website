import React from 'react';

const useEffectOnce = (fn: React.EffectCallback) => React.useEffect(fn, []);

export default useEffectOnce;
