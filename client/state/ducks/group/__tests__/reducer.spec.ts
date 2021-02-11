import { action } from 'typesafe-actions';
import { GroupActionTypes } from '@/types';

import { fetchGroups } from '../actions';
import { groupReducer, initialState } from '../reducer';

import groupData from './__mockData__/groupData';

describe('group reducer', () => {
  it('reducer initial', () => {
    expect(groupReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });

  it('reducer fetch start', () => {
    expect(groupReducer(initialState, fetchGroups())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('reducer fetch success', () => {
    expect(groupReducer(initialState, action(GroupActionTypes.FETCH.SUCCESS, groupData))).toEqual({
      ...initialState,
      data: groupData,
    });
  });

  it('reducer create success', () => {
    const currentState = { ...initialState, data: [...groupData] };
    expect(
      groupReducer(currentState, action(GroupActionTypes.CREATE.SUCCESS, groupData[0])),
    ).toEqual({
      ...currentState,
      data: [...groupData, groupData[0]],
    });
  });

  it('reducer update success', () => {
    const currentState = { ...initialState, data: [...groupData] };
    const newGroup = { ...groupData[0], name: 'Test gruppe' };
    expect(groupReducer(currentState, action(GroupActionTypes.UPDATE.SUCCESS, newGroup))).toEqual({
      ...currentState,
      data: [newGroup, ...groupData.slice(1, groupData.length)],
    });
  });

  it('reducer delete success', () => {
    const currentState = { ...initialState, data: [...groupData] };
    expect(
      groupReducer(currentState, action(GroupActionTypes.DELETE.SUCCESS, groupData[0])),
    ).toEqual({
      ...currentState,
      data: groupData.slice(1, groupData.length),
    });
  });

  it('reducer set group', () => {
    expect(groupReducer(initialState, action(GroupActionTypes.SET.SUCCESS, groupData[0]))).toEqual({
      ...initialState,
      byId: groupData[0],
    });
  });

  it('reducer set group to null', () => {
    const currentState = { ...initialState, byId: groupData[0] };
    expect(groupReducer(currentState, action(GroupActionTypes.SET.SUCCESS, {}))).toEqual({
      ...initialState,
    });
  });
});
