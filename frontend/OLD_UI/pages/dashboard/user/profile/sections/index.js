import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import InstructorsSection from './InstructorsSection';
import { capitalize } from '../../../../../lib/utils';
import AssistantSection from './AssistantSection';
import { StyledSectionSelector } from '../styles';

const SectionSelector = ({ t, user }) => {
  const setDefaultView = () => {
    if (user.isStudent) return 'student';
    if (user.isInstructor) return 'instructor';
    if (user.isAssistant) return 'assistant';
    return 'student';
  };
  const [view, setView] = useState(setDefaultView());

  const handleChange = ({ target: { value } }) => setView(value);

  const renderRadioInput = role => (
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

      {view === 'instructor' && user.isInstructor && <InstructorsSection t={t} instructor={user} />}
      {view === 'assistant' && user.isAssistant && <AssistantSection t={t} assistant={user} />}
    </>
  );
};

SectionSelector.propTypes = {
  t: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
};

export default SectionSelector;
