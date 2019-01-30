import React from 'react';
import PropTypes from 'prop-types';
import { Card, List, Badge } from 'antd';

function ModuleListCard({ t, modules }) {
  return (
    <Card title={t('Modules')} style={{ width: '160px' }}>
      <List
        itemLayout='horizontal'
        locale={{
          emptyText: t('NoModules'),
        }}
        dataSource={modules}
        renderItem={module => (
          <List.Item>
            <List.Item.Meta title={`${module.name} - ${module.section}`} description='' />
            <Badge showZero count={module.registeredStudents} />
          </List.Item>
        )}
      />
    </Card>
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
