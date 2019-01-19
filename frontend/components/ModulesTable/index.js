import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Table, Badge } from 'antd';

function ModulesTable({ modules, t }) {
  const columns = [
    {
      title: t('Module'),
      dataIndex: 'name',
      key: 'name',
      width: 60,
    },
    {
      title: t('Period'),
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: t('Score'),
      dataIndex: 'score',
      key: 'score',
      width: 60,
    },
    {
      title: t('Status'),
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: status => (
        <Badge
          style={{ textTransform: 'uppercase' }}
          key={status}
          text={t(status)}
          title={t(status)}
          status={status === 'Passed' ? 'success' : 'error'}
        />
      ),
    },
  ];

  const data = [];

  modules.map(module =>
    data.push({
      key: uuid(),
      name: `${module.name}`,
      period: `V ${2018}`,
      score: 100,
      status: 'Passed',
    }),
  );

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      locale={{
        emptyText: 'Sin datos',
        filterReset: 'Reset',
        filterConfirm: 'Ok',
      }}
    />
  );
}

ModulesTable.defaultProps = {
  modules: [],
};

ModulesTable.propTypes = {
  t: PropTypes.func.isRequired,
  modules: PropTypes.arrayOf(PropTypes.shape()),
};

export default ModulesTable;
