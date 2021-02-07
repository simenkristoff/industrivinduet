import { action } from 'typesafe-actions';

import { UserActionTypes, UserEntity } from './types';

/**
 * @desc Fetch all Users.
 */
export const fetchUsers = () =>
  action(UserActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/users',
  });

/**
 * @desc Create a new User.
 * @param {UserEntity} data the User to create.
 */
export const createUser = (data: UserEntity) =>
  action(UserActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/users',
  });

/**
 * @desc Update a User.
 * @param {UserEntity} data the User instance with updated data.
 */
export const updateUser = (data: UserEntity) =>
  action(UserActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/users/${data._id}`,
  });

/**
 * @desc Delete User.
 * @param {UserEntity} data the User instance to delete.
 */
export const deleteUser = (data: UserEntity) =>
  action(UserActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/users/${data._id}`,
  });

/**
 * @desc Set User.
 * @param {UserEntity} data the User instance to set.
 */
export const setUser = (data: UserEntity) => action(UserActionTypes.SET.START, data);