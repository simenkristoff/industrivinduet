import { action } from 'typesafe-actions';

import { ApiResponse, RoleActionTypes } from '@/types';
import roleData from '@/__mocks__/roleData';

import { roleReducer, initialState } from '../reducer';

describe('role reducer', () => {
  it('should equal initial state', () => {
    expect(roleReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(roleReducer(initialState, { type: RoleActionTypes.FETCH.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
    expect(roleReducer(initialState, { type: RoleActionTypes.CREATE.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
    expect(
      roleReducer(initialState, {
        type: RoleActionTypes.UPDATE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(roleReducer(initialState, { type: RoleActionTypes.DELETE.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(roleReducer(initialState, action(RoleActionTypes.FETCH.SUCCESS, roleData))).toEqual({
      ...initialState,
      data: roleData,
      loading: false,
    });
  });

  it('should append data on CREATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...roleData], loading: true };
    expect(roleReducer(currentState, action(RoleActionTypes.CREATE.SUCCESS, roleData[0]))).toEqual({
      ...currentState,
      data: [...roleData, roleData[0]],
      loading: false,
    });
  });

  it('should update data on UPDATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...roleData], loading: true };
    const newRole = { ...roleData[0], name: 'Test gruppe' };
    expect(roleReducer(currentState, action(RoleActionTypes.UPDATE.SUCCESS, newRole))).toEqual({
      ...currentState,
      data: [newRole, ...roleData.slice(1, roleData.length)],
      loading: false,
    });
  });

  it('should remove object on DELETE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...roleData], loading: true };
    expect(roleReducer(currentState, action(RoleActionTypes.DELETE.SUCCESS, roleData[0]))).toEqual({
      ...currentState,
      data: roleData.slice(1, roleData.length),
      loading: false,
    });
  });

  it('should set byId on SET.START', () => {
    expect(roleReducer(initialState, action(RoleActionTypes.SET.START, roleData[0]))).toEqual({
      ...initialState,
      byId: roleData[0],
    });
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: roleData[0] };
    expect(roleReducer(currentState, action(RoleActionTypes.SET.START, {}))).toEqual({
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
      roleReducer(state, { type: RoleActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      roleReducer(state, { type: RoleActionTypes.CREATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      roleReducer(state, { type: RoleActionTypes.UPDATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      roleReducer(state, { type: RoleActionTypes.DELETE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(roleReducer(state, { type: RoleActionTypes.SET.ERROR, payload: apiResponse })).toEqual({
      ...expectedState,
    });
  });
  it('should clear role state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      roleReducer(state, {
        type: RoleActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
