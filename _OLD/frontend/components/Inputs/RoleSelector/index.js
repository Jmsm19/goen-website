import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { capitalize } from '../../../utils';

const RoleSelector = ({ field, t }) => {
  const { Option } = Select;
  const roles = ['admin', 'instructor', 'assistant', 'student'];

  return (
    <Select {...field} defaultValue='admin' onChange={value => field.onChange('role_name', value)}>
      {roles.map(role => (
        <Option key={role} title={role} value={role}>
          {t(capitalize(role))}
        </Option>
      ))}
    </Select>
  );
};

RoleSelector.defaultProps = {
  field: {
    name: 'role-selector',
  },
};

RoleSelector.propTypes = {
  t: PropTypes.func.isRequired,
  field: PropTypes.shape(),
};

export default RoleSelector;
