import apiCaller from '@/state/utils/apiCaller';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { login, logout, register } from '../actions';
import authSaga from '../sagas';
import { AuthActionTypes } from '../types';

import { authLogin, authUser, authToken } from './__mockData__/authData';

describe('auth saga', () => {
  it('handle login success', () => {
    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), { user: authUser, token: authToken }]])
      .put({ type: AuthActionTypes.LOGIN.SUCCESS, payload: { user: authUser, token: authToken } })
      .dispatch(login(authLogin))
      .run();
  });
  it('handle login error', () => {
    const error = new Error('login error');

    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: AuthActionTypes.LOGIN.ERROR, payload: error.message })
      .dispatch(login(authLogin))
      .run();
  });
  it('handle register success', () => {
    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), { user: authUser, token: authToken }]])
      .put({
        type: AuthActionTypes.REGISTER.SUCCESS,
        payload: { user: authUser, token: authToken },
      })
      .dispatch(register(authUser))
      .run();
  });
  it('handle register error', () => {
    const error = new Error('register error');

    return expectSaga(authSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: AuthActionTypes.REGISTER.ERROR, payload: error.message })
      .dispatch(register(authUser))
      .run();
  });
  it('handle logout success', () => {
    return expectSaga(authSaga)
      .put({ type: AuthActionTypes.LOGOUT.SUCCESS })
      .dispatch(logout())
      .run();
  });
});
