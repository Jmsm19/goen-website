import * as React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useSnackbar } from 'notistack';

import usePreviousValue from '../../hooks/usePreviousValue';
import { generateSnackbarConfig } from '../../lib/utils';

type Props = {
  isOnline: boolean
}

const OfflineNotification: React.FC<Props> = ({ isOnline }) => {
  const { t, i18n } = useTranslation();
  const [key, setKey] = React.useState();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const { language } = i18n;
  const previousLanguage = usePreviousValue(language);
  const isLanguageDifferent = previousLanguage !== language;

  const handleSnackbarClose = React.useCallback(
    snackbarKey => {
      closeSnackbar(snackbarKey);
      setKey(undefined);
    },
    [closeSnackbar],
  );

  const snackbarConfig = React.useMemo(
    () =>
      generateSnackbarConfig('warning', null, null, {
        persist: true,
        preventDuplicate: true,
        action: () => (
          <IconButton color='secondary' onClick={() => handleSnackbarClose(key)}>
            <Close />
          </IconButton>
        ),
      }),
    [handleSnackbarClose, key],
  );

  React.useEffect(() => {
    if (isOnline && !!key) {
      handleSnackbarClose(key);
    }

    if ((!isOnline && !key) || (!isOnline && key && isLanguageDifferent)) {
      if (isLanguageDifferent && key) {
        handleSnackbarClose(key);
      }
      const newKey = enqueueSnackbar(t('CheckInternetConnection'), snackbarConfig);
      setKey(newKey);
    }
  }, [enqueueSnackbar, handleSnackbarClose, isLanguageDifferent, isOnline, key, snackbarConfig, t]);

  return null;
};

OfflineNotification.propTypes = {
  isOnline: PropTypes.bool.isRequired,
};

export default OfflineNotification;
