import { action } from 'typesafe-actions';

import { GroupActionTypes, GroupEntity } from '@/types';

/**
 * Fetch all Groups.
 */
export const fetchGroups = () =>
  action(GroupActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/groups',
  });

/**
 * Create a new Group.
 * @param {GroupEntity} data the Group to create.
 */
export const createGroup = (data: GroupEntity) =>
  action(GroupActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/groups',
  });

/**
 * Update a Group.
 * @param {GroupEntity} data the Group instance with updated data.
 */
export const updateGroup = (data: GroupEntity) =>
  action(GroupActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/groups/${data._id}`,
  });

/**
 * Delete Group.
 * @param {GroupEntity} data the Group instance to delete.
 */
export const deleteGroup = (data: GroupEntity) =>
  action(GroupActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/groups/${data._id}`,
  });

/**
 * Set Group.
 * @param {GroupEntity} data the Group instance to set.
 */
export const setGroup = (data?: GroupEntity) => action(GroupActionTypes.SET.START, data);

/**
 * Clears Group state
 */
export const clear = () => action(GroupActionTypes.CLEAR);
