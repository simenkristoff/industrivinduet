import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, RoleActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';

import { createRole, deleteRole, fetchRoles, setRole, updateRole } from '../actions';
import roleSaga from '../sagas';

import roleData from './__mockData__/roleData';

describe('role saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), roleData]])
      .put({ type: RoleActionTypes.FETCH.SUCCESS, payload: roleData })
      .dispatch(fetchRoles())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: RoleActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchRoles())
      .run();
  });

  it('should handle create success', () => {
    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), roleData[0]]])
      .put({ type: RoleActionTypes.CREATE.SUCCESS, payload: roleData[0] })
      .dispatch(createRole(roleData[0]))
      .run();
  });

  it('should handle create error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: RoleActionTypes.CREATE.ERROR, payload: apiResponse })
      .dispatch(createRole(roleData[0]))
      .run();
  });

  it('should handle update success', () => {
    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), roleData[0]]])
      .put({ type: RoleActionTypes.UPDATE.SUCCESS, payload: roleData[0] })
      .dispatch(updateRole(roleData[0]))
      .run();
  });

  it('should handle update error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: RoleActionTypes.UPDATE.ERROR, payload: apiResponse })
      .dispatch(updateRole(roleData[0]))
      .run();
  });

  it('should handle delete success', () => {
    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), roleData[0]]])
      .put({ type: RoleActionTypes.DELETE.SUCCESS, payload: roleData[0] })
      .dispatch(deleteRole(roleData[0]))
      .run();
  });

  it('should handle delete error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(roleSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: RoleActionTypes.DELETE.ERROR, payload: apiResponse })
      .dispatch(deleteRole(roleData[0]))
      .run();
  });

  it('should handle set success', () => {
    return expectSaga(roleSaga)
      .put({ type: RoleActionTypes.SET.SUCCESS, payload: roleData[0] })
      .dispatch(setRole(roleData[0]))
      .run();
  });
});
