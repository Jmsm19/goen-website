import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';
import { StyledCard, StyledIcon, StyledListItem } from '../../../styles/components/ModuleListCard';
import { sortModules } from '../../../utils';

function ModuleListCard({ t, modules }) {
  let sortedModules = null;

  if (modules.length) {
    sortedModules = sortModules(modules);
  }

  return (
    <StyledCard title={t('Module._plural')}>
      <List
        itemLayout='horizontal'
        locale={{
          emptyText: t('NoModules'),
        }}
        dataSource={sortedModules || modules}
        renderItem={module => (
          <StyledListItem>
            <List.Item.Meta title={`${module.name} - ${module.section}`} />
            <StyledIcon type='team' count={module.registeredStudents} />
            {module.registeredStudents}
          </StyledListItem>
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
