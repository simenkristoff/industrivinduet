import axios, { Method, AxiosRequestConfig } from 'axios';

import { getToken } from '../ducks/auth/helpers';

function handleErrors(response: Response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}

export default function apiCaller<T>(
  method: string,
  path: string,
  data?: any,
): Promise<T[] | null> {
  return fetch(`http://localhost:8080/${path}`, {
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
