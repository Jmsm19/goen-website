import posed from 'react-pose';

import PersonalDataSection from './personalDataSection';
import UserDataSection from './userDataSection';
import Button from '../../../components/UI/Button';

import { FadeIn } from '../../../animations';

// Container
export const FadeInContainer = posed.div(FadeIn({ beforeChildren: true }, { afterChildren: true }));

// Form sections
export const FadeInPersonalSection = posed(PersonalDataSection)(FadeIn());
export const FadeInUserSection = posed(UserDataSection)(FadeIn());

// Buttons
export const FadeInButtonArea = posed.div(FadeIn({ delay: 300 }));
export const FadeInButton = posed(Button)(FadeIn());
