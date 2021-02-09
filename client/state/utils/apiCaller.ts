import { getToken } from '../ducks/auth/helpers';

const API_URL =
  process.env.NODE_ENV === 'production' ? 'http://localhost' : 'http://localhost:8080';

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
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
    .then(handleErrors)
    .then((res) => res.json())
    .catch();
}

export default function apiCaller<T>(
  method: string,
  path: string,
  data?: any,
): Promise<T[] | null> {
  return fetch(`${API_URL}/${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `JWT ${getToken()?.encodedToken}`,
    },
    body: data ? JSON.stringify(data) : null,
  })
    .then(handleErrors)
    .then((res) => res.json())
    .catch();
}
