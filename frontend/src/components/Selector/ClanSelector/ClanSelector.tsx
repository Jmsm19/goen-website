import React from 'react';
import PropTypes from 'prop-types';

import Select from '../../UI/Select';

import { clans } from '../../../lib/config/constants';

const ClanSelector: React.FC<SelectProps> = ({ name, onChange, ...props }) => {
  const clanOptions = clans.map(clan => ({
    text: clan,
    value: clan,
  }));

  return (
    <Select
      className='clan-select'
      name={name}
      options={clanOptions}
      onChange={onChange}
      {...props}
    />
  );
};

ClanSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default ClanSelector;
