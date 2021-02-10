import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { MemberActionTypes } from '@/types';

import apiCaller from '@/state/utils/apiCaller';

import { createMember, deleteMember, fetchMembers, setMember, updateMember } from '../actions';
import memberSaga from '../sagas';

import memberData from './__mockData__/memberData';

describe('member saga', () => {
  it('handle fetch success', () => {
    return expectSaga(memberSaga)
      .provide([[matchers.call.fn(apiCaller), memberData]])
      .put({ type: MemberActionTypes.FETCH.SUCCESS, payload: memberData })
      .dispatch(fetchMembers())
      .run();
  });

  it('handle fetch error', () => {
    const error = new Error('fetch error');

    return expectSaga(memberSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: MemberActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchMembers())
      .run();
  });

  it('handle create success', () => {
    return expectSaga(memberSaga)
      .provide([[matchers.call.fn(apiCaller), memberData[0]]])
      .put({ type: MemberActionTypes.CREATE.SUCCESS, payload: memberData[0] })
      .dispatch(createMember(memberData[0]))
      .run();
  });

  it('handle create error', () => {
    const error = new Error('create error');

    return expectSaga(memberSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: MemberActionTypes.CREATE.ERROR, payload: error.message })
      .dispatch(createMember(memberData[0]))
      .run();
  });

  it('handle update success', () => {
    return expectSaga(memberSaga)
      .provide([[matchers.call.fn(apiCaller), memberData[0]]])
      .put({ type: MemberActionTypes.UPDATE.SUCCESS, payload: memberData[0] })
      .dispatch(updateMember(memberData[0]))
      .run();
  });

  it('handle update error', () => {
    const error = new Error('update error');

    return expectSaga(memberSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: MemberActionTypes.UPDATE.ERROR, payload: error.message })
      .dispatch(updateMember(memberData[0]))
      .run();
  });

  it('handle delete success', () => {
    return expectSaga(memberSaga)
      .provide([[matchers.call.fn(apiCaller), memberData[0]]])
      .put({ type: MemberActionTypes.DELETE.SUCCESS, payload: memberData[0] })
      .dispatch(deleteMember(memberData[0]))
      .run();
  });

  it('handle delete error', () => {
    const error = new Error('delete error');

    return expectSaga(memberSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: MemberActionTypes.DELETE.ERROR, payload: error.message })
      .dispatch(deleteMember(memberData[0]))
      .run();
  });

  it('handle set success', () => {
    return expectSaga(memberSaga)
      .put({ type: MemberActionTypes.SET.SUCCESS, payload: memberData[0] })
      .dispatch(setMember(memberData[0]))
      .run();
  });
});
