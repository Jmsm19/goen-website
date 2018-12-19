import fetch from 'isomorphic-fetch';
import getConfig from 'next/config';
import Cookies from 'js-cookie';

const { publicRuntimeConfig } = getConfig();
const ROOT_API = publicRuntimeConfig.API_URL;
const HEADERS = new Headers({
  'Content-Type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest'
});

const setAuthorizationHeader = () => {
  const TOKEN = Cookies.get('token'); // undefined if not present
  return !TOKEN ? '' : `Bearer ${TOKEN}`;
}

const GET = (endpoint = '') =>fetch(`${ROOT_API}${endpoint}`, {
  headers: HEADERS,
  'Authorization': setAuthorizationHeader(),
});

export default GET;