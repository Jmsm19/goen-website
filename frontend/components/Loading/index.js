import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import { withNamespaces } from '../../i18n';

export const Loading = ({ iconType, spinnerFontSize, text = '' }) => {
  const LoadingIcon = <Icon type={iconType} spin style={{ fontSize: spinnerFontSize }} />;

  return (
    <div className='page-loading'>
      <Spin tip={text} indicator={LoadingIcon} size='large' />
    </div>
  );
};

Loading.defaultProps = {
  text: '',
  iconType: 'loading',
  spinnerFontSize: '80px',
};

Loading.propTypes = {
  iconType: PropTypes.string,
  spinnerFontSize: PropTypes.string,
  text: PropTypes.string,
};

export default withNamespaces('common')(Loading);
