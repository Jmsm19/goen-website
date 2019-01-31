import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { StyledCard, StyledBadge } from '../../styles/components/ModuleListCard';

function ModuleListCard({ t, modules }) {
  return (
    <StyledCard title={t('Modules')}>
      <List
        itemLayout='horizontal'
        locale={{
          emptyText: t('NoModules'),
        }}
        dataSource={modules}
        renderItem={module => (
          <List.Item>
            <List.Item.Meta title={`${module.name} - ${module.section}`} />
            <StyledBadge showZero count={module.registeredStudents} />
          </List.Item>
        )}
      />
    </StyledCard>
  );
}

ModuleListCard.propTypes = {
  t: PropTypes.func.isRequired,
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      section: PropTypes.string,
      registeredStudents: PropTypes.number,
    }),
  ).isRequired,
};

export default ModuleListCard;
