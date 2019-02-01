import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
import Cookies from 'js-cookie';

const { publicRuntimeConfig } = getConfig();
const ROOT_API = publicRuntimeConfig.API_URL;

const TokenType = 'Bearer ';
const setLocalizationHeader = () => Cookies.get('i18next') || 'es';

const setAuthorizationHeader = () => {
  const TOKEN = Cookies.get('token'); // undefined if not present
  return !TOKEN ? '' : `${TokenType}${TOKEN}`;
};

export const getHeaders = (args = {}) => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
  Authorization: setAuthorizationHeader(),
  'X-Localization': setLocalizationHeader(),
  ...args,
});

const setHeaders = () => new Headers(getHeaders());

export const GetData = (endpoint = '') =>
  fetch(`${ROOT_API}${endpoint}`, {
    headers: setHeaders(),
  });

export const SendData = (method, endpoint = '', data = {}) =>
  fetch(`${ROOT_API}${endpoint}`, {
    method: method.toUpperCase(),
    body: JSON.stringify(data),
    headers: setHeaders(),
  });
