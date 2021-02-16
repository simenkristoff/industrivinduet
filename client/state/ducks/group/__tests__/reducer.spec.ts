import { action } from 'typesafe-actions';

import { ApiResponse, GroupActionTypes } from '@/types';

import { groupReducer, initialState } from '../reducer';

import groupData from './__mockData__/groupData';

describe('group reducer', () => {
  it('should equal initial state', () => {
    expect(groupReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(
      groupReducer(initialState, { type: GroupActionTypes.FETCH.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      groupReducer(initialState, { type: GroupActionTypes.CREATE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      groupReducer(initialState, {
        type: GroupActionTypes.UPDATE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      groupReducer(initialState, { type: GroupActionTypes.DELETE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(groupReducer(initialState, action(GroupActionTypes.FETCH.SUCCESS, groupData))).toEqual({
      ...initialState,
      data: groupData,
      loading: false,
    });
  });

  it('should append data on CREATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...groupData], loading: true };
    expect(
      groupReducer(currentState, action(GroupActionTypes.CREATE.SUCCESS, groupData[0])),
    ).toEqual({
      ...currentState,
      data: [...groupData, groupData[0]],
      loading: false,
    });
  });

  it('should update data on UPDATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...groupData], loading: true };
    const newGroup = { ...groupData[0], name: 'Test gruppe' };
    expect(groupReducer(currentState, action(GroupActionTypes.UPDATE.SUCCESS, newGroup))).toEqual({
      ...currentState,
      data: [newGroup, ...groupData.slice(1, groupData.length)],
      loading: false,
    });
  });

  it('should remove object on DELETE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...groupData], loading: true };
    expect(
      groupReducer(currentState, action(GroupActionTypes.DELETE.SUCCESS, groupData[0])),
    ).toEqual({
      ...currentState,
      data: groupData.slice(1, groupData.length),
      loading: false,
    });
  });

  it('should set byId on SET.START', () => {
    expect(groupReducer(initialState, action(GroupActionTypes.SET.START, groupData[0]))).toEqual({
      ...initialState,
      byId: groupData[0],
    });
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: groupData[0] };
    expect(groupReducer(currentState, action(GroupActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
  it('should set status on all ERROR', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };
    const state = { ...initialState, loading: true };
    const expectedState = { ...initialState, loading: false, status: apiResponse };
    expect(
      groupReducer(state, { type: GroupActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      groupReducer(state, { type: GroupActionTypes.CREATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      groupReducer(state, { type: GroupActionTypes.UPDATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      groupReducer(state, { type: GroupActionTypes.DELETE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      groupReducer(state, { type: GroupActionTypes.SET.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should clear group state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      groupReducer(state, {
        type: GroupActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
