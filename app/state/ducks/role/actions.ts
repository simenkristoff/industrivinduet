import { action } from 'typesafe-actions';

import { RoleActionTypes, RoleEntity } from './types';

/**
 * @desc Fetch all Roles.
 */
export const fetchRoles = () =>
  action(RoleActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/roles',
  });

/**
 * @desc Create a new Role.
 * @param {RoleEntity} data the Role to create.
 */
export const createRole = (data: RoleEntity) =>
  action(RoleActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/roles',
  });

/**
 * @desc Update a Role.
 * @param {RoleEntity} data the Role instance with updated data.
 */
export const updateRole = (data: RoleEntity) =>
  action(RoleActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/roles/${data._id}`,
  });

/**
 * @desc Delete Role.
 * @param {RoleEntity} data the Role instance to delete.
 */
export const deleteRole = (data: RoleEntity) =>
  action(RoleActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/roles/${data._id}`,
  });

/**
 * @desc Set Role.
 * @param {RoleEntity} data the Role instance to set.
 */
export const setRole = (data: RoleEntity) => action(RoleActionTypes.SET.START, data);
