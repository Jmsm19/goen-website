import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../UI/Select';

import { useInstructors } from '../../../context/UsersContext';

const AssistantSelector = ({ name, onChange, ...props }) => {
  const { assistants, allUsersSearched } = useInstructors();
  const assistantOptions = React.useMemo(
    () =>
      [...assistants.values()].map(assistant => ({
        text: assistant.name,
        value: assistant.id,
      })),
    [assistants],
  );

  return (
    <Select
      loading={!allUsersSearched}
      name={name}
      options={assistantOptions}
      onChange={onChange}
      {...props}
    />
  );
};

AssistantSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default AssistantSelector;
