import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const usePreviousValue = value => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

usePreviousValue.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any.isRequired,
};

export default usePreviousValue;
