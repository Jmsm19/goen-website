import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Warning } from 'styled-icons/material/Warning';
import { toast, Flip } from 'react-toastify';
import styled from 'styled-components';

const StyledAlertIcon = styled(Warning)`
  color: yellow;
  opacity: 0.8;
  vertical-align: middle;
`;

const OfflineNotification = ({ isOnline }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const notificationId = 'NoInternetConnection';
  const notifyOffline = () =>
    toast.error(
      <>
        <StyledAlertIcon size={24} /> {t('CheckInternetConnection')}
      </>,
      {
        autoClose: false,
        toastId: notificationId,
        closeButton: false,
        closeOnClick: true,
        position: toast.POSITION.BOTTOM_RIGHT,
        transition: Flip,
      },
    );

  useEffect(() => {
    if (!isOnline) {
      notifyOffline();
    } else if (toast.isActive(notificationId)) {
      toast.dismiss(notificationId);
    }
  }, [isOnline, language]);

  return null;
};

OfflineNotification.propTypes = {
  isOnline: PropTypes.bool.isRequired,
};

export default OfflineNotification;
