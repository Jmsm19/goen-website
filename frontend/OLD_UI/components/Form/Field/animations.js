import posed from 'react-pose';

import ErrorText from '../ErrorText';
import HelpText from '../HelpText';

import { SlideDown, FadeIn } from '../../../animations';

export const SlideDownErrorText = posed(ErrorText)(
  SlideDown(
    { delay: 300 },
    {
      y: -24,
      opacity: 1,
    },
  ),
);

export const FadeInHelpText = posed(HelpText)(FadeIn({ delay: 200 }, { duration: 0 }));
