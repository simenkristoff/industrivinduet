import { action } from 'typesafe-actions';

import { AuthActionTypes, LoginCredentials, RegisterCredentials } from './types';

/**
 * @desc Register new User
 */
export const register = (data: RegisterCredentials) =>
  action(AuthActionTypes.REGISTER.START, data, {
    method: 'post',
    route: 'api/register',
  });

/**
 * @desc Login User
 */
export const login = (data: LoginCredentials) => {
  return action(AuthActionTypes.LOGIN.START, data, {
    method: 'post',
    route: 'api/login',
  });
};

/**
 * @desc Logout User.
 */
export const logout = () => action(AuthActionTypes.LOGOUT.START);