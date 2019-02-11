import React from 'react';
import PropTypes from 'prop-types';
import CardWithTabs from '../CardWithTabs';
import AssignInstructorRoleForm from '../Dashboard/AssignInstructorRoleForm';

const InstructorAssignmentCard = ({ t }) => {
  const tabs = [
    {
      key: 'manage-instructors',
      tab: t('ManageInstructors'),
    },
  ];

  const content = {
    'manage-instructors': <AssignInstructorRoleForm t={t} />,
  };

  return (
    <CardWithTabs
      tabs={tabs}
      content={content}
      defaultTabKey='manage-instructors'
      bodyStyle={{ padding: '0', maxHeight: '500px' }}
    />
  );
};

InstructorAssignmentCard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default InstructorAssignmentCard;
