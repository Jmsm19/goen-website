import React from 'react'
import PropTypes from 'prop-types';
import { Spin, Icon } from 'antd';
import { withNamespaces } from '../../i18n';

export const Loading = ({ iconType = 'loading', spinnerFontSize = '80px', text = '' }) => {
  const LoadingIcon = <Icon type={iconType} spin style={{ fontSize: spinnerFontSize }} />

  return (
    <div className="page-loading">
      <Spin
        tip={text}
        indicator={LoadingIcon}
        size="large" />
    </div>
  )
}

Loading.propTypes = {
  iconType: PropTypes.string.isRequired,
  spinnerFontSize: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default withNamespaces('common')(Loading )
