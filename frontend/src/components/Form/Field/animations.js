import posed from 'react-pose';

import ErrorField from '../ErrorField';

import { SlideDown } from '../../../animations';

const SlideDownErrorField = posed(ErrorField)(
  SlideDown(null, {
    y: -24,
    opacity: 1,
  }),
);

export default SlideDownErrorField;
