import posed from 'react-pose';

import ErrorText from '../ErrorText';

import { SlideDown } from '../../../animations';

const SlideDownErrorText = posed(ErrorText)(
  SlideDown(null, {
    y: -24,
    opacity: 1,
  }),
);

export default SlideDownErrorText;
