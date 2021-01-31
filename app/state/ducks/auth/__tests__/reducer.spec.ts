import { authReducer } from '../reducer';
import { AuthActionTypes } from '../types';

import {
  authLogin,
  authUser,
  authToken,
  signedInState,
  signedOutState,
} from './__mockData__/authData';

describe('auth reducer', () => {
  it('reducer initial', () => {
    expect(authReducer(signedInState, { type: 'no type', payload: [] })).toEqual(signedInState);
  });
  it('reducer login start', () => {
    expect(
      authReducer(signedOutState, { type: AuthActionTypes.LOGIN.START, payload: authLogin }),
    ).toEqual({ ...signedOutState, loggingIn: true, loginFailed: false });
  });
  it('reducer register success', () => {
    expect(
      authReducer(signedOutState, {
        type: AuthActionTypes.REGISTER.SUCCESS,
        payload: { user: authUser, token: authToken },
      }),
    ).toEqual({
      ...signedOutState,
      isLoggedIn: true,
      loggingIn: false,
      _id: authUser._id,
      email: authUser.email,
      permissions: authUser.permissions,
      member: authUser.member,
      token: authToken,
    });
  });
  it('reducer login success', () => {
    expect(
      authReducer(signedOutState, {
        type: AuthActionTypes.LOGIN.SUCCESS,
        payload: { user: authUser, token: authToken },
      }),
    ).toEqual({
      ...signedOutState,
      isLoggedIn: true,
      loggingIn: false,
      _id: authUser._id,
      email: authUser.email,
      permissions: authUser.permissions,
      member: authUser.member,
      token: authToken,
    });
  });
  it('reducer logout success', () => {
    expect(
      authReducer(signedInState, {
        type: AuthActionTypes.LOGOUT.SUCCESS,
        payload: [],
      }),
    ).toEqual({
      ...signedOutState,
    });
  });
  it('reducer login error', () => {
    expect(authReducer(signedOutState, { type: AuthActionTypes.LOGIN.ERROR, payload: [] })).toEqual(
      {
        ...signedOutState,
        loggingIn: false,
        loginFailed: true,
        errors: ['Ugyldig brukernavn og/eller passord.'],
      },
    );
  });
  it('reducer register error', () => {
    expect(
      authReducer(signedOutState, {
        type: AuthActionTypes.REGISTER.ERROR,
        payload: 'register failed',
      }),
    ).toEqual({
      ...signedOutState,
      errors: ['register failed'],
    });
  });
  it('reducer logout error', () => {
    expect(
      authReducer(signedInState, {
        type: AuthActionTypes.LOGOUT.ERROR,
        payload: 'logout failed',
      }),
    ).toEqual({
      ...signedInState,
      errors: ['logout failed'],
    });
  });
  it('reducer clear', () => {
    const state = { ...signedOutState, errors: ['register failed', 'logout failed'] };
    expect(
      authReducer(state, {
        type: AuthActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...signedOutState,
    });
  });
});
