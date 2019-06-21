import React from 'react';
import { AxiosError, AxiosResponse } from 'axios';

import { GetData, SendData } from '../../lib/utils/http';

interface AxiosConfig {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body: object;
}

interface State {
  isRequesting: boolean;
  response: {
    status: number;
    data: any;
  } | null;
}

/**
 * Hook to perform http requests using Axios
 *
 * @param {String} url
 * @param {object} config { method = 'GET', body = {} }
 * @param {string} config.method
 * @param {Object} config.body
 * @returns {[Boolean, {status: Number, data: {}}]} [ isRequesting, response ]
 */
const useAxios = (url: string, config: AxiosConfig = { method: 'GET', body: {} }) => {
  const { method, body } = config;

  const [{ isRequesting, response }, setState] = React.useState<State>({
    isRequesting: true,
    response: null,
  });

  const handleSuccess = React.useCallback(
    () => (res: AxiosResponse) => {
      setState({
        isRequesting: false,
        response: {
          status: res.status,
          data: res.data,
        },
      });
    },
    [],
  );

  const handleError = React.useCallback(
    () => (res: AxiosError) => {
      if (res.response && res.response.status >= 400) {
        setState({
          isRequesting: false,
          response,
        });
      }
    },
    [response],
  );

  React.useEffect(() => {
    if (method.trim().toLocaleLowerCase() === 'get') {
      GetData(url)
        .then(handleSuccess)
        .catch(handleError);
    } else {
      SendData(method, url, body)
        .then(handleSuccess)
        .catch(handleError);
    }
  }, [body, handleError, handleSuccess, method, url]);

  return { isRequesting, response };
};

export default useAxios;
