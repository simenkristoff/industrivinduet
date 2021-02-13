import { getToken } from '../ducks/auth/helpers';

const API_DEV_PORT = process.env.SERVER_PORT as string;
const API_URL =
  process.env.NODE_ENV === 'production'
    ? (process.env.API_URL as string)
    : `http://localhost:${API_DEV_PORT}`;

function handleResponse(response: Response) {
  const res = response.json().then((data) => {
    if (!response.ok) {
      throw Error(data.message);
    }

    return data;
  });

  return res;
}

export function fileApiCaller<FormData>(method: string, path: string, data?: any) {
  return fetch(`${API_URL}/${path}`, {
    method,
    mode: 'cors',
    headers: {
      Authorization: `JWT ${getToken()?.encodedToken}`,
    },
    body: data,
  })
    .then(handleResponse)
    .catch();
}

export default function apiCaller<T>(method: string, path: string, data?: any) {
  return fetch(`${API_URL}/${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${getToken()?.encodedToken}`,
    },
    body: data ? JSON.stringify(data) : null,
  })
    .then(handleResponse)
    .catch();
}
