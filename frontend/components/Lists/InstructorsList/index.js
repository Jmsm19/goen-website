import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Card, Avatar } from 'antd';
import withInstructorsContext from '../../HOCs/withInstructorsContext';
import { getClanImageAddress } from '../../../utils';

const InstructorsList = ({ t, instructors, instructorContext, onListItemClick, loading }) => {
  const { getAllInstructors } = instructorContext;
  const contextInstructors = instructorContext.instructors;

  useEffect(() => {
    if (!contextInstructors.length && !Array.isArray(instructors)) {
      getAllInstructors();
    }
  }, []);

  return (
    <List
      loading={loading}
      style={{ minHeight: 100, maxHeight: 500, height: '100%' }}
      dataSource={instructors || contextInstructors}
      locale={{
        emptyText: t('NoInstructors'),
      }}
      renderItem={({ id, name, email, clan }) => (
        <Card hoverable onClick={() => onListItemClick(id)}>
          <Card.Meta
            avatar={<Avatar size='large' src={getClanImageAddress(clan)} />}
            title={name}
            description={email}
          />
        </Card>
      )}
    />
  );
};

InstructorsList.defaultProps = {
  loading: false,
  instructors: null,
  onListItemClick: () => null,
};

InstructorsList.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  onListItemClick: PropTypes.func,
  instructors: PropTypes.oneOf([
    PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
    PropTypes.null,
  ]),
  instructorContext: PropTypes.shape({
    getAllInstructors: PropTypes.func,
    instructors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};

export default withInstructorsContext(InstructorsList);
