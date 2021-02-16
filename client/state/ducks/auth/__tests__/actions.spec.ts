import { action } from 'typesafe-actions';

import { AuthActionTypes } from '@/types';

import { register, login, logout, forgot, reset, clear } from '../actions';

import {
  registerCredentials,
  loginCredentials,
  forgotPasswordCredentials,
  resetPasswordCredentials,
} from './__mockData__/authData';

describe('auth actions', () => {
  it('should call @@auth.REGISTER.START', () => {
    const expectedAction = action(AuthActionTypes.REGISTER.START, registerCredentials, {
      method: 'post',
      route: 'api/register',
    });

    expect(register(registerCredentials)).toEqual(expectedAction);
  });

  it('should call @@auth.LOGIN.START', () => {
    const expectedAction = action(AuthActionTypes.LOGIN.START, loginCredentials, {
      method: 'post',
      route: `api/login`,
    });

    expect(login(loginCredentials)).toEqual(expectedAction);
  });

  it('should call @@auth.SEND_FORGOT_PASSWORD.START', () => {
    const expectedAction = action(
      AuthActionTypes.SEND_FORGOT_PASSWORD.START,
      forgotPasswordCredentials,
      {
        method: 'post',
        route: `api/forgot`,
      },
    );

    expect(forgot(forgotPasswordCredentials)).toEqual(expectedAction);
  });

  it('should call @@auth.RESET_PASSWORD.START', () => {
    const expectedAction = action(AuthActionTypes.RESET_PASSWORD.START, resetPasswordCredentials, {
      method: 'post',
      route: `api/reset`,
    });

    expect(reset(resetPasswordCredentials)).toEqual(expectedAction);
  });

  it('should call @@auth.LOGOUT', () => {
    const expectedAction = action(AuthActionTypes.LOGOUT);

    expect(logout()).toEqual(expectedAction);
  });

  it('should call @auth.CLEAR', () => {
    const expectedAction = action(AuthActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
