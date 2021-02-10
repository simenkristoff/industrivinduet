import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { UserActionTypes } from '@/types';

import apiCaller from '@/state/utils/apiCaller';

import { createUser, deleteUser, fetchUsers, setUser, updateUser } from '../actions';
import userSaga from '../sagas';

import userData from './__mockData__/userData';

describe('user saga', () => {
  it('handle fetch success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData]])
      .put({ type: UserActionTypes.FETCH.SUCCESS, payload: userData })
      .dispatch(fetchUsers())
      .run();
  });

  it('handle fetch error', () => {
    const error = new Error('fetch error');

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchUsers())
      .run();
  });

  it('handle create success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData[0]]])
      .put({ type: UserActionTypes.CREATE.SUCCESS, payload: userData[0] })
      .dispatch(createUser(userData[0]))
      .run();
  });

  it('handle create error', () => {
    const error = new Error('create error');

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.CREATE.ERROR, payload: error.message })
      .dispatch(createUser(userData[0]))
      .run();
  });

  it('handle update success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData[0]]])
      .put({ type: UserActionTypes.UPDATE.SUCCESS, payload: userData[0] })
      .dispatch(updateUser(userData[0]))
      .run();
  });

  it('handle update error', () => {
    const error = new Error('update error');

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.UPDATE.ERROR, payload: error.message })
      .dispatch(updateUser(userData[0]))
      .run();
  });

  it('handle delete success', () => {
    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), userData[0]]])
      .put({ type: UserActionTypes.DELETE.SUCCESS, payload: userData[0] })
      .dispatch(deleteUser(userData[0]))
      .run();
  });

  it('handle delete error', () => {
    const error = new Error('delete error');

    return expectSaga(userSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: UserActionTypes.DELETE.ERROR, payload: error.message })
      .dispatch(deleteUser(userData[0]))
      .run();
  });

  it('handle set success', () => {
    return expectSaga(userSaga)
      .put({ type: UserActionTypes.SET.SUCCESS, payload: userData[0] })
      .dispatch(setUser(userData[0]))
      .run();
  });
});
