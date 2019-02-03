import React from 'react';
import PropTypes from 'prop-types';
import CardWithTabs from '../CardWithTabs';
import AssignInstructorRoleForm from '../Dashboard/AssignInstructorRoleForm';
import AssignInstructorModuleForm from '../Dashboard/AssignInstructorModuleForm';

const InstructorAssignmentCard = ({ t }) => {
  const tabs = [
    {
      key: 'assign-instructor',
      tab: t('AssignInstructor'),
    },
    {
      key: 'manage-instructors',
      tab: t('ManageInstructors'),
    },
  ];

  const content = {
    'assign-instructor': <AssignInstructorModuleForm t={t} />,
    'manage-instructors': <AssignInstructorRoleForm t={t} />,
  };

  return (
    <CardWithTabs
      tabs={tabs}
      content={content}
      defaultTabKey='assign-instructor'
      bodyStyle={{ padding: '0 16px', minHeight: 500 }}
    />
  );
};

InstructorAssignmentCard.propTypes = {
  t: PropTypes.func.isRequired,
};

export default InstructorAssignmentCard;
