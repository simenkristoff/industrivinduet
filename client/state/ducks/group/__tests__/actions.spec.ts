import { action } from 'typesafe-actions';

import { GroupActionTypes, GroupEntity } from '@/types';

import { clear, createGroup, deleteGroup, fetchGroups, setGroup, updateGroup } from '../actions';

import groupData from './__mockData__/groupData';

describe('group actions', () => {
  it('should call @@group.FETCH.START', () => {
    const expectedAction = action(GroupActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/groups',
    });

    expect(fetchGroups()).toEqual(expectedAction);
  });

  it('should call @@group.CREATE.START', () => {
    const payload: GroupEntity = groupData[1];
    const expectedAction = action(GroupActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/groups`,
    });

    expect(createGroup(payload)).toEqual(expectedAction);
  });

  it('should call @@group.UPDATE.START', () => {
    const payload: GroupEntity = groupData[1];
    const expectedAction = action(GroupActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/groups/${payload._id}`,
    });

    expect(updateGroup(payload)).toEqual(expectedAction);
  });

  it('should call @@group.DELETE.START', () => {
    const payload: GroupEntity = groupData[1];
    const expectedAction = action(GroupActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/groups/${payload._id}`,
    });

    expect(deleteGroup(payload)).toEqual(expectedAction);
  });

  it('should call @@group.SET.START', () => {
    const payload: GroupEntity = groupData[1];
    const expectedAction = action(GroupActionTypes.SET.START, payload);

    expect(setGroup(payload)).toEqual(expectedAction);
  });

  it('should call @group.CLEAR', () => {
    const expectedAction = action(GroupActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
