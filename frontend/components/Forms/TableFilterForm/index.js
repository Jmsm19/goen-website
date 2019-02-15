import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Button } from 'antd';

class TableFilterForm extends Component {
  render() {
    const { t, setSelectedKeys, selectedKeys, handleSearch, clearFilters, confirm } = this.props;
    return (
      <div style={{ padding: 8, boxShadow: 'rgba(0, 0, 0, 0.15) 0px 2px 8px', background: '#FFF' }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
          autoFocus
        />
        <Button
          type='primary'
          onClick={() => handleSearch(confirm)}
          icon='search'
          size='small'
          style={{ width: 90, marginRight: 8 }}
        >
          {t('Search')}
        </Button>
        <Button onClick={() => clearFilters()} size='small' style={{ width: 90 }}>
          {t('Reset')}
        </Button>
      </div>
    );
  }
}

TableFilterForm.propTypes = {
  t: PropTypes.func.isRequired,
  setSelectedKeys: PropTypes.func.isRequired,
  selectedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSearch: PropTypes.func.isRequired,
  clearFilters: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default TableFilterForm;
