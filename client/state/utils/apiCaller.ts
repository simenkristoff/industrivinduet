import { getToken } from '../ducks/auth/helpers';
import { Token } from '../ducks/auth/types';

const API_DEV_PORT = process.env.SERVER_PORT as string;
const API_URL =
  process.env.NODE_ENV === 'production'
    ? (process.env.API_URL as string)
    : `http://localhost:${API_DEV_PORT}`;

/**
 * Validates the status of an API response
 * @param {Respone} response the response from API to verify
 */
function handleResponse(response: Response) {
  const res = response.json().then((data) => {
    if (!response.ok) {
      throw Error(data.message);
    }

    return data;
  });

  return res;
}

/**
 * Wrapper for file upload request
 * @param method the HTTP-method
 * @param path the api path
 * @param data the data to send (optional)
 */
export function fileApiCaller<FormData>(method: string, path: string, data?: any) {
  const authToken: Token | undefined = getToken();
  const requestHeader: HeadersInit = new Headers();
  if (authToken) requestHeader.set('Authorization', `JWT ${authToken.encodedToken}`);

  return fetch(`${API_URL}/${path}`, {
    method,
    mode: 'cors',
    headers: requestHeader,
    body: data,
  })
    .then(handleResponse)
    .catch();
}

/**
 * Wrapper for API request
 * @param method the HTTP-method
 * @param path the api path
 * @param data the data to send (optional)
 */
export default function apiCaller<T>(method: string, path: string, data?: any) {
  const authToken: Token | undefined = getToken();
  const requestHeader: HeadersInit = new Headers();
  requestHeader.set('Accept', 'application/json');
  requestHeader.set('Content-Type', 'application/json');
  if (authToken) requestHeader.set('Authorization', `JWT ${authToken.encodedToken}`);

  return fetch(`${API_URL}/${path}`, {
    method,
    headers: requestHeader,
    body: data ? JSON.stringify(data) : null,
  })
    .then(handleResponse)
    .catch();
}
