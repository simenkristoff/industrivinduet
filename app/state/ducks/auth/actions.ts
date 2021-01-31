import { action } from 'typesafe-actions';

import { AuthActionTypes, LoginCredentials, RegisterCredentials } from './types';

/**
 * @desc Register new User
 */
export const register = (data: RegisterCredentials) =>
  action(AuthActionTypes.REGISTER.START, data, {
    method: 'post',
    route: 'auth/register',
  });

/**
 * @desc Login User
 */
export const login = (data: LoginCredentials) =>
  action(AuthActionTypes.LOGIN.START, data, {
    method: 'post',
    route: 'auth/login',
  });

/**
 * @desc Logout User.
 */
export const logout = () => action(AuthActionTypes.LOGOUT.START);
