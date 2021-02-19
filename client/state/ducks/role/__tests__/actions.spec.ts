import { action } from 'typesafe-actions';

import { RoleActionTypes, RoleEntity } from '@/types';
import roleData from '@/__mocks__/roleData';

import { clear, createRole, deleteRole, fetchRoles, setRole, updateRole } from '../actions';

describe('role actions', () => {
  it('should call @@role.FETCH.START', () => {
    const expectedAction = action(RoleActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/roles',
    });

    expect(fetchRoles()).toEqual(expectedAction);
  });

  it('should call @@role.CREATE.START', () => {
    const payload: RoleEntity = roleData[1];
    const expectedAction = action(RoleActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/roles`,
    });

    expect(createRole(payload)).toEqual(expectedAction);
  });

  it('should call @@role.UPDATE.START', () => {
    const payload: RoleEntity = roleData[1];
    const expectedAction = action(RoleActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/roles/${payload._id}`,
    });

    expect(updateRole(payload)).toEqual(expectedAction);
  });

  it('should call @@role.DELETE.START', () => {
    const payload: RoleEntity = roleData[1];
    const expectedAction = action(RoleActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/roles/${payload._id}`,
    });

    expect(deleteRole(payload)).toEqual(expectedAction);
  });

  it('should call @@role.SET.START', () => {
    const payload: RoleEntity = roleData[1];
    const expectedAction = action(RoleActionTypes.SET.START, payload);

    expect(setRole(payload)).toEqual(expectedAction);
  });

  it('should call @role.CLEAR', () => {
    const expectedAction = action(RoleActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
