import posed from 'react-pose';

import { FadeIn } from '../../animations';

const FadeInLoadingOverlay = posed.div(
  FadeIn(
    {
      transition: 'ease',
    },
    { transition: 'ease' },
  ),
);

export default FadeInLoadingOverlay;
