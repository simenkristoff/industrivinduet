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
  loginFailed: false,
  loggingIn: false,
  errors: [],
};

export const initialState: AuthState = currentUser
  ? {
      _id: currentUser.sub.id,
      email: currentUser.sub.email,
      permissions: currentUser.sub.permissions,
      member: currentUser.sub.member,
      token: currentUser.encodedToken,
      isLoggedIn: true,
      loginFailed: false,
      loggingIn: false,
      errors: [],
    }
  : loggetOutState;

export const authReducer = (
  state: AuthState = initialState,
  action: Action<TypeConstant> & PayloadAction<TypeConstant, any>,
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN.START:
      return { ...state, loggingIn: true, loginFailed: false, errors: [] };
    case AuthActionTypes.LOGIN.ERROR:
      return {
        ...state,
        loggingIn: false,
        loginFailed: true,
        errors: [...state.errors, 'Ugyldig brukernavn og/eller passord.'],
      };
    case AuthActionTypes.REGISTER.START:
      return { ...state, loggingIn: true, loginFailed: false, errors: [] };
    case AuthActionTypes.REGISTER.ERROR:
      return {
        ...state,
        loggingIn: false,
        loginFailed: true,
        errors: [...state.errors, `Fant ikke medlem med e-mail: '${action.payload}'.`],
      };
    case AuthActionTypes.LOGIN.SUCCESS:
    case AuthActionTypes.REGISTER.SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggingIn: false,
        _id: action.payload.user._id,
        email: action.payload.user.email,
        permissions: action.payload.user.permissions,
        member: action.payload.user.member,
        token: action.payload.token,
      };
    case AuthActionTypes.LOGOUT.SUCCESS:
      return {
        ...loggetOutState,
      };
    case AuthActionTypes.REGISTER.ERROR:
    case AuthActionTypes.LOGOUT.ERROR:
      return {
        ...state,
        errors: [...state.errors, action.payload],
      };
    case AuthActionTypes.CLEAR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
