import { action } from 'typesafe-actions';

import { RoleActionTypes, RoleEntity } from '@/types';

/**
 * Fetch all Roles.
 */
export const fetchRoles = () =>
  action(RoleActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/roles',
  });

/**
 * Create a new Role.
 * @param {RoleEntity} data the Role to create.
 */
export const createRole = (data: RoleEntity) =>
  action(RoleActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/roles',
  });

/**
 * Update a Role.
 * @param {RoleEntity} data the Role instance with updated data.
 */
export const updateRole = (data: RoleEntity) =>
  action(RoleActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/roles/${data._id}`,
  });

/**
 * Delete Role.
 * @param {RoleEntity} data the Role instance to delete.
 */
export const deleteRole = (data: RoleEntity) =>
  action(RoleActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/roles/${data._id}`,
  });

/**
 * Set Role.
 * @param {RoleEntity} data the Role instance to set.
 */
export const setRole = (data: RoleEntity) => action(RoleActionTypes.SET.START, data);

/**
 * Clears Role state
 */
export const clear = () => action(RoleActionTypes.CLEAR);
