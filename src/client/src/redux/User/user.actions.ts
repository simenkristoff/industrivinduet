import userTypes from './user.types';

// Types
import { User } from '../../types';

export const loginUserStart = (loginCredentials: any) => ({
  type: userTypes.LOGIN_USER_START,
  payload: loginCredentials,
});

export const loginUserSuccess = (user: User) => ({
  type: userTypes.LOGIN_USER_SUCCESS,
  payload: user,
});

export const logoutUserStart = () => ({
  type: userTypes.LOGOUT_USER_START,
});

export const logoutUserSuccess = () => ({
  type: userTypes.LOGOUT_USER_SUCCESS,
});

export const registerUserStart = (registerCredentials: any) => ({
  type: userTypes.REGISTER_USER_START,
  payload: registerCredentials,
});

export const userError = (err: string[]) => ({
  type: userTypes.USER_ERROR,
  payload: err,
});
