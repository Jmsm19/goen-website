import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../UI/Select';

import { moduleOrder } from '../../../lib/config/constants';

const ModuleNameSelector = ({ name, onChange, ...props }) => {
  const moduleOptions = moduleOrder.map(module => ({
    text: module,
    value: module,
  }));

  return <Select name={name} options={moduleOptions} onChange={onChange} {...props} />;
};

ModuleNameSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ModuleNameSelector;
