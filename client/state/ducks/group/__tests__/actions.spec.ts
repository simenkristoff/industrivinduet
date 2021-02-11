import { action } from 'typesafe-actions';
import { GroupActionTypes, GroupEntity } from '@/types';

import { createGroup, deleteGroup, fetchGroups, setGroup, updateGroup } from '../actions';

import groupData from './__mockData__/groupData';

describe('group actions', () => {
  // FETCH: Test if the correct function is called when fetching Groups.
  it('fetch groups', () => {
    const expectedAction = action(GroupActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/groups',
    });

    expect(fetchGroups()).toEqual(expectedAction);
  });

  // CREATE: Test if the correct function is called when creating a Group.
  it('create group', () => {
    const payload: GroupEntity = groupData[1];
    const expectedAction = action(GroupActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/groups`,
    });

    expect(createGroup(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Group.
  it('update group', () => {
    const payload: GroupEntity = groupData[1];
    const expectedAction = action(GroupActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/groups/${payload._id}`,
    });

    expect(updateGroup(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Group.
  it('delete group', () => {
    const payload: GroupEntity = groupData[1];
    const expectedAction = action(GroupActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/groups/${payload._id}`,
    });

    expect(deleteGroup(payload)).toEqual(expectedAction);
  });

  // SET: Test if the correct function is called when setting Group.
  it('set group', () => {
    const payload: GroupEntity = groupData[1];
    const expectedAction = action(GroupActionTypes.SET.START, payload);

    expect(setGroup(payload)).toEqual(expectedAction);
  });
});
