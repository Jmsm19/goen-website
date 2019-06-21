import React, { useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

import InstructorsSection from './InstructorsSection';
import AssistantSection from './AssistantSection';

import { capitalize } from '../../../../../lib/utils';
import { UserPropType } from '../../../../../lib/validation/propTypesValues';
import { StyledSectionSelector } from '../styles';

interface Props {
  user: User;
}

const SectionSelector: React.FC<Props> = ({ user }) => {
  const { t } = useTranslation();
  const setDefaultView = () => {
    if (user.isStudent) return 'student';
    if (user.isInstructor) return 'instructor';
    if (user.isAssistant) return 'assistant';
    return 'student';
  };
  const [view, setView] = useState(setDefaultView());

  const handleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    setView(value);

  const renderRadioInput = (role: RoleNames) => (
    <label htmlFor={role} className={classnames(['selector'], { selected: view === role })}>
      <input
        id={role}
        name='view'
        type='radio'
        value={role}
        defaultChecked={view === role}
        onChange={handleChange}
      />
      {t(`${capitalize(role)}._singular`)}
    </label>
  );

  return (
    <>
      <StyledSectionSelector className='section-selector'>
        {/* Select student view */}
        {user.isStudent && renderRadioInput('student')}
        {/* Select instructor view */}
        {user.isInstructor && renderRadioInput('instructor')}
        {/* Select assistant view */}
        {user.isAssistant && renderRadioInput('assistant')}
      </StyledSectionSelector>

      {view === 'instructor' && user.isInstructor && <InstructorsSection instructor={user} />}
      {view === 'assistant' && user.isAssistant && <AssistantSection assistant={user} />}
    </>
  );
};

SectionSelector.propTypes = {
  user: UserPropType.isRequired,
};

export default SectionSelector;
