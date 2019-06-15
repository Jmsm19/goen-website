import Cookies from 'js-cookie';
import axios from 'axios';

const TokenType = 'Bearer ';

const setLocalizationHeader = () => Cookies.get('language') || 'es';

const setAuthorizationHeader = () => {
  const TOKEN = Cookies.get('token'); // undefined if not present
  return !TOKEN ? '' : `${TokenType}${TOKEN}`;
};

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export const GetData = (endpoint = '') =>
  axiosInstance.get(endpoint, {
    headers: {
      'Accept-Language': setLocalizationHeader(),
      Authorization: setAuthorizationHeader(),
    },
  });

export const SendData = (method: 'GET' | 'POST' | 'PUT' | 'DELETE', endpoint = '', data = {}) =>
  axiosInstance({
    method,
    url: endpoint,
    data,
    headers: {
      'Accept-Language': setLocalizationHeader(),
      Authorization: setAuthorizationHeader(),
    },
  });
