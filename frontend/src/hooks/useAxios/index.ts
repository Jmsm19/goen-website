import { useState, useEffect } from 'react';
import { GetData, SendData } from '../../lib/utils/http';

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

  useEffect(() => {
    if (method.trim().toLocaleLowerCase() === 'get') {
      GetData(url)
        .then(handleResponse)
        .catch(handleResponse);
    } else {
      SendData(method, url, body)
        .then(handleResponse)
        .catch(handleResponse);
    }
  }, [body, method, url]);

  return [isRequesting, response];
};

export default useAxios;
