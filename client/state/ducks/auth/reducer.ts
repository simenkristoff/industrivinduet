import { Action, TypeConstant, PayloadAction } from 'typesafe-actions';

import { AuthActionTypes, AuthState } from '@/types';

import { getToken } from './helpers';

const currentUser = getToken();

export const loggetOutState: AuthState = {
  _id: null,
  email: null,
  permissions: null,
  member: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  status: null,
};

export const initialState: AuthState = currentUser
  ? {
      _id: currentUser.sub.id,
      email: currentUser.sub.email,
      permissions: currentUser.sub.permissions,
      member: currentUser.sub.member,
      token: currentUser.encodedToken,
      isLoggedIn: true,
      loading: false,
      status: null,
    }
  : loggetOutState;

export const authReducer = (
  state: AuthState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN.START:
    case AuthActionTypes.REGISTER.START:
    case AuthActionTypes.SEND_FORGOT_PASSWORD.START:
    case AuthActionTypes.RESET_PASSWORD.START:
      return { ...state, loading: true, status: null };

    case AuthActionTypes.LOGIN.SUCCESS:
    case AuthActionTypes.REGISTER.SUCCESS:
      return {
        ...state,
        _id: action.payload.user._id,
        email: action.payload.user.email,
        permissions: action.payload.user.permissions,
        member: action.payload.user.member,
        token: action.payload.token,
        isLoggedIn: true,
        loading: false,
        status: null,
      };
    case AuthActionTypes.LOGIN.ERROR:
    case AuthActionTypes.REGISTER.ERROR:
    case AuthActionTypes.SEND_FORGOT_PASSWORD.ERROR:
    case AuthActionTypes.RESET_PASSWORD.ERROR:
    case AuthActionTypes.SEND_FORGOT_PASSWORD.SUCCESS:
    case AuthActionTypes.RESET_PASSWORD.SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.payload,
      };

    case AuthActionTypes.LOGOUT:
      return {
        ...loggetOutState,
      };
    case AuthActionTypes.CLEAR:
      return {
        ...state,
        loading: false,
        status: null,
      };

    default:
      return state;
  }
};
