import jwtDecode from 'jwt-decode';
import cookie from 'js-cookie';
import moment from 'moment';

import { UserPermissions } from '../user/types';

import { AuthState, DecodedToken, EncodedToken, Token } from './types';

const STORAGE_KEY = 'iv.auth';

export function saveToken(token: EncodedToken) {
  const decoded: DecodedToken = jwtDecode(token);
  const expires = moment.unix(decoded.exp);

  return cookie.set(STORAGE_KEY, token, {
    path: '/',
    expires: expires.toDate(),
    secure: process.env.NODE_ENV === 'production',
  });
}

export function removeToken() {
  return cookie.remove(STORAGE_KEY, { path: '/' });
}

export function getToken(): Token | undefined {
  const encodedToken = cookie.get(STORAGE_KEY);
  if (!encodedToken) return;

  try {
    const decoded: DecodedToken = jwtDecode(encodedToken);

    return {
      ...decoded,
      encodedToken,
    };
  } catch (err) {
    console.log('No cookie found');
  }
}

/**
 * Check if User is Authorized
 * @param currentUser
 */
export const checkUserIsAuth = (currentUser: AuthState) => {
  if (!currentUser) {
    return false;
  }

  if (currentUser.token) {
    return true;
  }

  return false;
};

/**
 * Check if User has Admin permissions
 * @param currentUser
 */
export const checkUserIsAdmin = (currentUser: AuthState) => {
  if (!currentUser || !currentUser.permissions) {
    return false;
  }

  const { permissions } = currentUser;
  if (permissions === UserPermissions['ADMIN']) {
    return true;
  }

  return false;
};
