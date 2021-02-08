import { action } from 'typesafe-actions';

import { createMember, deleteMember, fetchMembers, setMember, updateMember } from '../actions';
import { MemberActionTypes, MemberEntity } from '../types';

import memberData from './__mockData__/memberData';

describe('member actions', () => {
  // FETCH: Test if the correct function is called when fetching Members.
  it('fetch members', () => {
    const expectedAction = action(MemberActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/members',
    });

    expect(fetchMembers()).toEqual(expectedAction);
  });

  // CREATE: Test if the correct function is called when creating a Member.
  it('create member', () => {
    const payload: MemberEntity = memberData[1];
    const expectedAction = action(MemberActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/members`,
    });

    expect(createMember(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Member.
  it('update member', () => {
    const payload: MemberEntity = memberData[1];
    const expectedAction = action(MemberActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/members/${payload._id}`,
    });

    expect(updateMember(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Member.
  it('delete member', () => {
    const payload: MemberEntity = memberData[1];
    const expectedAction = action(MemberActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/members/${payload._id}`,
    });

    expect(deleteMember(payload)).toEqual(expectedAction);
  });

  // SET: Test if the correct function is called when setting Member.
  it('set member', () => {
    const payload: MemberEntity = memberData[1];
    const expectedAction = action(MemberActionTypes.SET.START, payload);

    expect(setMember(payload)).toEqual(expectedAction);
  });
});
