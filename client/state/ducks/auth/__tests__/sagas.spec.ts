import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { AuthActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';
import { ApiResponse } from '@/state/interface';

import { forgot, login, logout, register, reset } from '../actions';
import authSaga from '../sagas';

import {
  loginCredentials,
  registerCredentials,
  forgotPasswordCredentials,
  resetPasswordCredentials,
  authUser,
  authToken,
} from './__mockData__/authData';

describe('auth saga', () => {
  it('should handle register success', () => {
    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), { user: authUser, token: authToken }]])
      .put({
        type: AuthActionTypes.REGISTER.SUCCESS,
        payload: { user: authUser, token: authToken },
      })
      .dispatch(register(registerCredentials))
      .run();
  });
  it('should handle register error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: AuthActionTypes.REGISTER.ERROR, payload: apiResponse })
      .dispatch(register(registerCredentials))
      .run();
  });
  it('should handle login success', () => {
    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), { user: authUser, token: authToken }]])
      .put({ type: AuthActionTypes.LOGIN.SUCCESS, payload: { user: authUser, token: authToken } })
      .dispatch(login(loginCredentials))
      .run();
  });
  it('should handle login error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: AuthActionTypes.LOGIN.ERROR, payload: apiResponse })
      .dispatch(login(loginCredentials))
      .run();
  });

  it('should handle forgot password success', () => {
    const apiResponse: ApiResponse = {
      status: 'success',
      message: 'Success',
    };

    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), apiResponse]])
      .put({
        type: AuthActionTypes.SEND_FORGOT_PASSWORD.SUCCESS,
        payload: apiResponse,
      })
      .dispatch(forgot(forgotPasswordCredentials))
      .run();
  });
  it('should handle forgot password error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: AuthActionTypes.SEND_FORGOT_PASSWORD.ERROR, payload: apiResponse })
      .dispatch(forgot(forgotPasswordCredentials))
      .run();
  });

  it('should handle reset password success', () => {
    const apiResponse: ApiResponse = {
      status: 'success',
      message: 'Success',
    };

    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), apiResponse]])
      .put({
        type: AuthActionTypes.RESET_PASSWORD.SUCCESS,
        payload: apiResponse,
      })
      .dispatch(reset(resetPasswordCredentials))
      .run();
  });
  it('should handle reset password error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: AuthActionTypes.RESET_PASSWORD.ERROR, payload: apiResponse })
      .dispatch(reset(resetPasswordCredentials))
      .run();
  });
});
