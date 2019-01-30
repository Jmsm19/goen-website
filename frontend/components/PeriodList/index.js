import React from 'react';
import PropTypes from 'prop-types';
import { List, Skeleton, Button, Icon } from 'antd';
import { withNamespaces } from '../../i18n';

function PeriodList({ t, list, setPeriodAsCurrent, deletePeriod, loading }) {
  const actions = id => [
    <Button type='dashed' onClick={() => setPeriodAsCurrent(id)}>
      {t('MakeCurrent')}
    </Button>,
    <Button type='danger' onClick={() => deletePeriod(id)}>
      <Icon type='delete' />
    </Button>,
  ];

  return (
    <List
      loading={loading}
      itemLayout='horizontal'
      locale={{
        emptyText: t('NoPeriods'),
      }}
      dataSource={list}
      renderItem={item => (
        <List.Item actions={!item.active && actions(item.id)}>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta title={`${t('Period')} ${item.name} - ${item.year}`} description='' />
            {item.active && t('Current')}
          </Skeleton>
        </List.Item>
      )}
    />
  );
}

PeriodList.propTypes = {
  t: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setPeriodAsCurrent: PropTypes.func.isRequired,
  deletePeriod: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withNamespaces('common')(PeriodList);
