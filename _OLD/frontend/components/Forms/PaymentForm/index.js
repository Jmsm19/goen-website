import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Upload, Icon, notification } from 'antd';
import getConfig from 'next/config';
import { getHeaders } from '../../../utils/fetch';

class PaymentForm extends Component {
  state = {
    fileList: [],
    uploading: false,
  };

  uploadImage = ({ file, fileList }) => {
    const { t, setImageUploadStatus } = this.props;
    const { status } = file;

    if (status === 'done') {
      setImageUploadStatus(true);
      notification.success({
        message: t('UploadSuccess'),
      });
    } else if (status === 'error') {
      setImageUploadStatus(false);
      notification.error({
        message: t('UploadFailed'),
      });
    }

    this.setState({
      // Remove files with undefined status and show only one file in list
      fileList: fileList.filter(fileItem => fileItem.status).slice(-1),
      uploading: status === 'uploading',
    });
  };

  beforeUpload = file => {
    const { t } = this.props;
    const isValidImageFormat = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt500K = file.size / 1024 / 1024 < 0.5;
    if (!isValidImageFormat) {
      notification.error({
        message: t('JpgPngOnly'),
      });
    } else if (!isLt500K) {
      notification.error({
        message: t('ImageLT500'),
      });
    }

    return isLt500K && isValidImageFormat;
  };

  render() {
    const { t } = this.props;
    const { fileList, uploading } = this.state;
    const { Dragger } = Upload;
    const { publicRuntimeConfig } = getConfig();
    const { API_URL } = publicRuntimeConfig;

    return (
      <Dragger
        name='image'
        accept='image/*'
        multiple={false}
        disabled={uploading}
        fileList={fileList}
        headers={getHeaders({
          'Content-Type': null,
        })}
        action={`${API_URL}/module/register/send-capture`}
        beforeUpload={this.beforeUpload}
        onChange={this.uploadImage}
      >
        <p className='ant-upload-drag-icon'>
          <Icon type='upload' />
        </p>
        <p className='ant-upload-text'>{t('ClickDragToUploadFile')}</p>
      </Dragger>
    );
  }
}

PaymentForm.propTypes = {
  t: PropTypes.func.isRequired,
  setImageUploadStatus: PropTypes.func.isRequired,
};

export default PaymentForm;
