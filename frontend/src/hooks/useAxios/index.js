import { useState } from 'react';
import { GetData, SendData } from '../../lib/utils/http';

import useEffectOnce from '../useEffectOnce';

/**
 * Hook to perform http requests using Axios
 *
 * @param {String} url
 * @param {object} config { method = 'GET', body = {} }
 * @param {string} config.method
 * @param {Object} config.body
 * @returns {[Boolean, {status: Number, data: {}}]} [ isRequesting, response ]
 */
const useAxios = (url, config = { method: 'GET', body: {} }) => {
  const { method, body } = config;

  const [{ isRequesting, response }, setState] = useState({
    isRequesting: true,
    response: null,
  });

  const handleResponse = res => {
    if (res.response && res.response.status >= 400) {
      // On Error
      setState({
        isRequesting: false,
        response: res.response,
      });
    } else {
      // On Success
      setState({
        isRequesting: false,
        response: {
          status: res.status,
          data: res.data,
        },
      });
    }
  };

  useEffectOnce(() => {
    if (method.trim().toLocaleLowerCase() === 'get') {
      GetData(url)
        .then(handleResponse)
        .catch(handleResponse);
    } else {
      SendData(method, url, body)
        .then(handleResponse)
        .catch(handleResponse);
    }
  });

  return [isRequesting, response];
};

export default useAxios;
