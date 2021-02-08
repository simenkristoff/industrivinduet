import { action } from 'typesafe-actions';

import { fetchRoles } from '../actions';
import { roleReducer, initialState } from '../reducer';
import { RoleActionTypes, RoleEntity } from '../types';

import roleData from './__mockData__/roleData';

describe('role reducer', () => {
  it('reducer initial', () => {
    expect(roleReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });

  it('reducer fetch start', () => {
    expect(roleReducer(initialState, fetchRoles())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('reducer fetch success', () => {
    expect(roleReducer(initialState, action(RoleActionTypes.FETCH.SUCCESS, roleData))).toEqual({
      ...initialState,
      data: roleData,
    });
  });

  it('reducer create success', () => {
    const currentState = { ...initialState, data: [...roleData] };
    expect(roleReducer(currentState, action(RoleActionTypes.CREATE.SUCCESS, roleData[0]))).toEqual({
      ...currentState,
      data: [...roleData, roleData[0]],
    });
  });

  it('reducer update success', () => {
    const currentState = { ...initialState, data: [...roleData] };
    const newRole = { ...roleData[0], name: 'Test gruppe' };
    expect(roleReducer(currentState, action(RoleActionTypes.UPDATE.SUCCESS, newRole))).toEqual({
      ...currentState,
      data: [newRole, ...roleData.slice(1, roleData.length)],
    });
  });

  it('reducer delete success', () => {
    const currentState = { ...initialState, data: [...roleData] };
    expect(roleReducer(currentState, action(RoleActionTypes.DELETE.SUCCESS, roleData[0]))).toEqual({
      ...currentState,
      data: roleData.slice(1, roleData.length),
    });
  });

  it('reducer set role', () => {
    expect(roleReducer(initialState, action(RoleActionTypes.SET.START, roleData[0]))).toEqual({
      ...initialState,
      byId: roleData[0],
    });
  });

  it('reducer set role to null', () => {
    const currentState = { ...initialState, byId: roleData[0] };
    expect(roleReducer(currentState, action(RoleActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
});
