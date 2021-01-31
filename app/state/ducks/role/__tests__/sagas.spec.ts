import apiCaller from '@/state/utils/apiCaller';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { action } from 'typesafe-actions';

import { createRole, deleteRole, fetchRoles, setRole, updateRole } from '../actions';
import roleSaga from '../sagas';
import { RoleActionTypes } from '../types';

import roleData from './__mockData__/roleData';

describe('role saga', () => {
  it('handle fetch success', () => {
    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), roleData]])
      .put({ type: RoleActionTypes.FETCH.SUCCESS, payload: roleData })
      .dispatch(fetchRoles())
      .run();
  });

  it('handle fetch error', () => {
    const error = new Error('fetch error');

    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: RoleActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchRoles())
      .run();
  });

  it('handle create success', () => {
    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), roleData[0]]])
      .put({ type: RoleActionTypes.CREATE.SUCCESS, payload: roleData[0] })
      .dispatch(createRole(roleData[0]))
      .run();
  });

  it('handle create error', () => {
    const error = new Error('create error');

    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: RoleActionTypes.CREATE.ERROR, payload: error.message })
      .dispatch(createRole(roleData[0]))
      .run();
  });

  it('handle update success', () => {
    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), roleData[0]]])
      .put({ type: RoleActionTypes.UPDATE.SUCCESS, payload: roleData[0] })
      .dispatch(updateRole(roleData[0]))
      .run();
  });

  it('handle update error', () => {
    const error = new Error('update error');

    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: RoleActionTypes.UPDATE.ERROR, payload: error.message })
      .dispatch(updateRole(roleData[0]))
      .run();
  });

  it('handle delete success', () => {
    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), roleData[0]]])
      .put({ type: RoleActionTypes.DELETE.SUCCESS, payload: roleData[0] })
      .dispatch(deleteRole(roleData[0]))
      .run();
  });

  it('handle delete error', () => {
    const error = new Error('delete error');

    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: RoleActionTypes.DELETE.ERROR, payload: error.message })
      .dispatch(deleteRole(roleData[0]))
      .run();
  });

  it('handle set success', () => {
    return expectSaga(roleSaga)
      .put({ type: RoleActionTypes.SET.SUCCESS, payload: roleData[0] })
      .dispatch(setRole(roleData[0]))
      .run();
  });
});
