import { ApiResponse, AuthActionTypes } from '@/types';
import { authUser, authToken, signedInState, signedOutState } from '@/__mocks__/authData';

import { authReducer } from '../reducer';

describe('auth reducer', () => {
  it('should equal initial state', () => {
    expect(authReducer(signedOutState, { type: 'no type', payload: [] })).toEqual(signedOutState);
  });
  it('should update loading and status on all START', () => {
    expect(
      authReducer(signedOutState, { type: AuthActionTypes.LOGIN.START, payload: [] }),
    ).toEqual({ ...signedOutState, loading: true, status: null });
    expect(
      authReducer(signedOutState, { type: AuthActionTypes.REGISTER.START, payload: [] }),
    ).toEqual({ ...signedOutState, loading: true, status: null });
    expect(
      authReducer(signedOutState, {
        type: AuthActionTypes.SEND_FORGOT_PASSWORD.START,
        payload: [],
      }),
    ).toEqual({ ...signedOutState, loading: true, status: null });
    expect(
      authReducer(signedOutState, { type: AuthActionTypes.RESET_PASSWORD.START, payload: [] }),
    ).toEqual({ ...signedOutState, loading: true, status: null });
  });
  it('should update auth state on login and register SUCCESS', () => {
    expect(
      authReducer(signedOutState, {
        type: AuthActionTypes.LOGIN.SUCCESS,
        payload: { user: authUser, token: authToken },
      }),
    ).toEqual({
      ...signedInState,
    });
    expect(
      authReducer(signedOutState, {
        type: AuthActionTypes.REGISTER.SUCCESS,
        payload: { user: authUser, token: authToken },
      }),
    ).toEqual({
      ...signedInState,
    });
  });
  it('should set status on all ERROR', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };
    const state = { ...signedOutState, loading: true };
    const expectedState = { ...signedOutState, loading: false, status: apiResponse };
    expect(
      authReducer(state, { type: AuthActionTypes.LOGIN.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      authReducer(state, { type: AuthActionTypes.REGISTER.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      authReducer(state, {
        type: AuthActionTypes.SEND_FORGOT_PASSWORD.ERROR,
        payload: apiResponse,
      }),
    ).toEqual({ ...expectedState });
    expect(
      authReducer(state, { type: AuthActionTypes.RESET_PASSWORD.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      authReducer(state, { type: AuthActionTypes.LOGIN.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should update status on send forgotten/reset password success', () => {
    const apiResponse: ApiResponse = {
      status: 'success',
      message: 'Success',
    };
    const state = { ...signedOutState, loading: true };
    const expectedState = { ...signedOutState, loading: false, status: apiResponse };
    expect(
      authReducer(state, {
        type: AuthActionTypes.SEND_FORGOT_PASSWORD.SUCCESS,
        payload: apiResponse,
      }),
    ).toEqual({ ...expectedState });
    expect(
      authReducer(state, { type: AuthActionTypes.RESET_PASSWORD.SUCCESS, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should reset state on logout', () => {
    expect(
      authReducer(signedInState, {
        type: AuthActionTypes.LOGOUT,
        payload: [],
      }),
    ).toEqual({ ...signedOutState });
  });
  it('should clear auth state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'Registration failed',
    };
    const state = { ...signedOutState, status: apiResponse };
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
