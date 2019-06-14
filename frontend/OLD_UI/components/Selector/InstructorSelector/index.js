import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../UI/Select';

import { useInstructors } from '../../../store/context/UsersContext';

const InstructorSelector = ({ name, onChange, ...props }) => {
  const { instructors, allUsersSearched } = useInstructors();
  const instructorOptions = React.useMemo(
    () =>
      [...instructors.values()].map(instructor => ({
        text: instructor.name,
        value: instructor.id,
      })),
    [instructors],
  );

  return (
    <Select
      loading={!allUsersSearched}
      name={name}
      options={instructorOptions}
      onChange={onChange}
      {...props}
    />
  );
};

InstructorSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default InstructorSelector;
