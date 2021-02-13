import { action } from 'typesafe-actions';

import {
  AuthActionTypes,
  LoginCredentials,
  RegisterCredentials,
  ForgotPasswordCredentials,
  ResetPasswordCredentials,
} from '@/types';

import { removeToken } from './helpers';

/**
 * Register a new User
 * @param {RegisterCredentials} data register credentials
 */
export const register = (data: RegisterCredentials) =>
  action(AuthActionTypes.REGISTER.START, data, {
    method: 'post',
    route: 'api/register',
  });

/**
 * Send a login request to API
 * @param {LoginCredentials} data login credentials
 */
export const login = (data: LoginCredentials) => {
  return action(AuthActionTypes.LOGIN.START, data, {
    method: 'post',
    route: 'api/login',
  });
};

/**
 * Send a request for resetting password
 * @param {ForgotPasswordCredentials} data forgotten password credentials
 */
export const forgot = (data: ForgotPasswordCredentials) => {
  return action(AuthActionTypes.SEND_FORGOT_PASSWORD.START, data, {
    method: 'post',
    route: 'api/forgot',
  });
};

/**
 * Reset password
 * @param {ResetPasswordCredentials} data reset password credentials
 */
export const reset = (data: ResetPasswordCredentials) => {
  return action(AuthActionTypes.RESET_PASSWORD.START, data, {
    method: 'post',
    route: 'api/reset',
  });
};

/**
 * @desc Logout User.
 */
export const logout = () => {
  removeToken();

  return action(AuthActionTypes.LOGOUT);
};

/**
 * Clears Sser state
 */
export const clear = () => action(AuthActionTypes.CLEAR);
