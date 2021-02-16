import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, UserActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';

import {
  createUser,
  deleteUser,
  fetchUsers,
  lookupRegisterToken,
  setUser,
  updateUser,
} from '../actions';
import userSaga from '../sagas';

import userData, { registerTokenData } from './__mockData__/userData';

describe('user saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData]])
      .put({ type: UserActionTypes.FETCH.SUCCESS, payload: userData })
      .dispatch(fetchUsers())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchUsers())
      .run();
  });

  it('should handle create success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData[0]]])
      .put({ type: UserActionTypes.CREATE.SUCCESS, payload: userData[0] })
      .dispatch(createUser(userData[0]))
      .run();
  });

  it('should handle create error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.CREATE.ERROR, payload: apiResponse })
      .dispatch(createUser(userData[0]))
      .run();
  });

  it('should handle update success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData[0]]])
      .put({ type: UserActionTypes.UPDATE.SUCCESS, payload: userData[0] })
      .dispatch(updateUser(userData[0]))
      .run();
  });

  it('should handle update error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.UPDATE.ERROR, payload: apiResponse })
      .dispatch(updateUser(userData[0]))
      .run();
  });

  it('should handle delete success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData[0]]])
      .put({ type: UserActionTypes.DELETE.SUCCESS, payload: userData[0] })
      .dispatch(deleteUser(userData[0]))
      .run();
  });

  it('should handle delete error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.DELETE.ERROR, payload: apiResponse })
      .dispatch(deleteUser(userData[0]))
      .run();
  });

  it('should handle lookup register token success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData[1]]])
      .put({ type: UserActionTypes.LOOKUP_REGISTER_TOKEN.SUCCESS, payload: userData[1] })
      .dispatch(lookupRegisterToken(registerTokenData))
      .run();
  });

  it('should handle lookup register token error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.LOOKUP_REGISTER_TOKEN.ERROR, payload: apiResponse })
      .dispatch(lookupRegisterToken(registerTokenData))
      .run();
  });

  it('should handle set success', () => {
    return expectSaga(userSaga)
      .put({ type: UserActionTypes.SET.SUCCESS, payload: userData[0] })
      .dispatch(setUser(userData[0]))
      .run();
  });
});
