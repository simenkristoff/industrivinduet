import { action } from 'typesafe-actions';

import { MemberActionTypes, MemberEntity } from '@/types';

import {
  clear,
  createMember,
  deleteMember,
  fetchMembers,
  setMember,
  updateMember,
} from '../actions';

import memberData from './__mockData__/memberData';

describe('member actions', () => {
  it('should call @@member.FETCH.START', () => {
    const expectedAction = action(MemberActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/members',
    });

    expect(fetchMembers()).toEqual(expectedAction);
  });

  it('should call @@member.CREATE.START', () => {
    const payload: MemberEntity = memberData[1];
    const expectedAction = action(MemberActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/members`,
    });

    expect(createMember(payload)).toEqual(expectedAction);
  });

  it('should call @@member.UPDATE.START', () => {
    const payload: MemberEntity = memberData[1];
    const expectedAction = action(MemberActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/members/${payload._id}`,
    });

    expect(updateMember(payload)).toEqual(expectedAction);
  });

  it('should call @@member.DELETE.START', () => {
    const payload: MemberEntity = memberData[1];
    const expectedAction = action(MemberActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/members/${payload._id}`,
    });

    expect(deleteMember(payload)).toEqual(expectedAction);
  });

  it('should call @@member.SET.START', () => {
    const payload: MemberEntity = memberData[1];
    const expectedAction = action(MemberActionTypes.SET.START, payload);

    expect(setMember(payload)).toEqual(expectedAction);
  });

  it('should call @member.CLEAR', () => {
    const expectedAction = action(MemberActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
