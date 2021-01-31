import { action } from 'typesafe-actions';

import { createRole, deleteRole, fetchRoles, setRole, updateRole } from '../actions';
import { RoleActionTypes, RoleEntity } from '../types';

import roleData from './__mockData__/roleData';

describe('role actions', () => {
  // FETCH: Test if the correct function is called when fetching Roles.
  it('fetch roles', () => {
    const expectedAction = action(RoleActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/roles',
    });

    expect(fetchRoles()).toEqual(expectedAction);
  });

  // CREATE: Test if the correct function is called when creating a Role.
  it('create role', () => {
    const payload: RoleEntity = roleData[1];
    const expectedAction = action(RoleActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/roles`,
    });

    expect(createRole(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Role.
  it('update role', () => {
    const payload: RoleEntity = roleData[1];
    const expectedAction = action(RoleActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/roles/${payload._id}`,
    });

    expect(updateRole(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Role.
  it('delete role', () => {
    const payload: RoleEntity = roleData[1];
    const expectedAction = action(RoleActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/roles/${payload._id}`,
    });

    expect(deleteRole(payload)).toEqual(expectedAction);
  });

  // SET: Test if the correct function is called when setting Role.
  it('set role', () => {
    const payload: RoleEntity = roleData[1];
    const expectedAction = action(RoleActionTypes.SET.START, payload);

    expect(setRole(payload)).toEqual(expectedAction);
  });
});
