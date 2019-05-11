import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Alert as Warning } from 'styled-icons/octicons/Alert';
import { toast, Flip } from 'react-toastify';
import styled from 'styled-components';

const StyledAlertIcon = styled(Warning)`
  color: yellow;
  opacity: 0.8;
  vertical-align: middle;
`;

const OfflineNotification = ({ isOnline, isMobile }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();

  const notificationId = 'NoInternetConnection';

  useEffect(() => {
    if (!isOnline) {
      toast.error(
        <>
          <StyledAlertIcon size={24} /> {t('CheckInternetConnection')}
        </>,
        {
          autoClose: false,
          toastId: notificationId,
          closeButton: false,
          closeOnClick: true,
          position: isMobile ? toast.POSITION.BOTTOM_CENTER : toast.POSITION.TOP_RIGHT,
          transition: Flip,
        },
      );
    } else if (toast.isActive(notificationId)) {
      toast.dismiss(notificationId);
    }
  }, [isMobile, isOnline, language, t]);

  return null;
};

OfflineNotification.propTypes = {
  isOnline: PropTypes.bool.isRequired,
};

export default OfflineNotification;
