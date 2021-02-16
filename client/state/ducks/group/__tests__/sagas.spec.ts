import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, GroupActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';

import { createGroup, deleteGroup, fetchGroups, setGroup, updateGroup } from '../actions';
import groupSaga from '../sagas';

import groupData from './__mockData__/groupData';

describe('group saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), groupData]])
      .put({ type: GroupActionTypes.FETCH.SUCCESS, payload: groupData })
      .dispatch(fetchGroups())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: GroupActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchGroups())
      .run();
  });

  it('should handle create success', () => {
    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), groupData[0]]])
      .put({ type: GroupActionTypes.CREATE.SUCCESS, payload: groupData[0] })
      .dispatch(createGroup(groupData[0]))
      .run();
  });

  it('should handle create error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: GroupActionTypes.CREATE.ERROR, payload: apiResponse })
      .dispatch(createGroup(groupData[0]))
      .run();
  });

  it('should handle update success', () => {
    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), groupData[0]]])
      .put({ type: GroupActionTypes.UPDATE.SUCCESS, payload: groupData[0] })
      .dispatch(updateGroup(groupData[0]))
      .run();
  });

  it('should handle update error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: GroupActionTypes.UPDATE.ERROR, payload: apiResponse })
      .dispatch(updateGroup(groupData[0]))
      .run();
  });

  it('should handle delete success', () => {
    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), groupData[0]]])
      .put({ type: GroupActionTypes.DELETE.SUCCESS, payload: groupData[0] })
      .dispatch(deleteGroup(groupData[0]))
      .run();
  });

  it('should handle delete error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: GroupActionTypes.DELETE.ERROR, payload: apiResponse })
      .dispatch(deleteGroup(groupData[0]))
      .run();
  });

  it('should handle set success', () => {
    return expectSaga(groupSaga)
      .put({ type: GroupActionTypes.SET.SUCCESS, payload: groupData[0] })
      .dispatch(setGroup(groupData[0]))
      .run();
  });
});
