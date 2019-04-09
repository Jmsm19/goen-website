import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { Table, Button } from 'antd';

function ModulesTable({ modules, hiddenColumns, t }) {
  const data = [];

  const columns = [
    !hiddenColumns.includes('moduleName') && {
      title: t('Module._singular'),
      dataIndex: 'moduleName',
      key: 'moduleName',
      width: 60,
    },
    !hiddenColumns.includes('instructor') && {
      title: t('Instructor'),
      dataIndex: 'instructor',
      key: 'instructor',
    },
    !hiddenColumns.includes('action') && {
      title: '',
      dataIndex: 'action',
      key: 'action',
      // eslint-disable-next-line react/prop-types
      render: ({ name, btnType, event }) => (
        <Button type={btnType} onClick={event}>
          {name}
        </Button>
      ),
    },
  ].filter(Boolean);

  if (modules.length > 0) {
    modules.map(({ name, instructor }) =>
      data.push({
        key: uuid(),
        moduleName: `${name}`,
        instructor: instructor ? instructor.name : t('NoInstructorAssigned'),
        action: !instructor
          ? {
              name: t('AssignInstructor'),
              btnType: 'primary',
              event: () => null,
            }
          : {
              name: t('ChangeInstructor'),
              btnType: 'dashed',
              event: () => null,
            },
      }),
    );
  }

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      locale={{
        emptyText: t('NoData'),
        filterReset: t('Reset'),
        filterConfirm: t('Ok'),
      }}
    />
  );
}

ModulesTable.defaultProps = {
  modules: [],
  hiddenColumns: [],
};

ModulesTable.propTypes = {
  t: PropTypes.func.isRequired,
  hiddenColumns: PropTypes.arrayOf(PropTypes.string),
  modules: PropTypes.arrayOf(PropTypes.shape()),
};

export default ModulesTable;
