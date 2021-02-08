import apiCaller from '@/state/utils/apiCaller';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { action } from 'typesafe-actions';

import { createGroup, deleteGroup, fetchGroups, setGroup, updateGroup } from '../actions';
import groupSaga from '../sagas';
import { GroupActionTypes } from '../types';

import groupData from './__mockData__/groupData';

describe('group saga', () => {
  it('handle fetch success', () => {
    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), groupData]])
      .put({ type: GroupActionTypes.FETCH.SUCCESS, payload: groupData })
      .dispatch(fetchGroups())
      .run();
  });

  it('handle fetch error', () => {
    const error = new Error('fetch error');

    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: GroupActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchGroups())
      .run();
  });

  it('handle create success', () => {
    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), groupData[0]]])
      .put({ type: GroupActionTypes.CREATE.SUCCESS, payload: groupData[0] })
      .dispatch(createGroup(groupData[0]))
      .run();
  });

  it('handle create error', () => {
    const error = new Error('create error');

    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: GroupActionTypes.CREATE.ERROR, payload: error.message })
      .dispatch(createGroup(groupData[0]))
      .run();
  });

  it('handle update success', () => {
    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), groupData[0]]])
      .put({ type: GroupActionTypes.UPDATE.SUCCESS, payload: groupData[0] })
      .dispatch(updateGroup(groupData[0]))
      .run();
  });

  it('handle update error', () => {
    const error = new Error('update error');

    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: GroupActionTypes.UPDATE.ERROR, payload: error.message })
      .dispatch(updateGroup(groupData[0]))
      .run();
  });

  it('handle delete success', () => {
    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), groupData[0]]])
      .put({ type: GroupActionTypes.DELETE.SUCCESS, payload: groupData[0] })
      .dispatch(deleteGroup(groupData[0]))
      .run();
  });

  it('handle delete error', () => {
    const error = new Error('delete error');

    return expectSaga(groupSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: GroupActionTypes.DELETE.ERROR, payload: error.message })
      .dispatch(deleteGroup(groupData[0]))
      .run();
  });

  it('handle set success', () => {
    return expectSaga(groupSaga)
      .put({ type: GroupActionTypes.SET.SUCCESS, payload: groupData[0] })
      .dispatch(setGroup(groupData[0]))
      .run();
  });
});
