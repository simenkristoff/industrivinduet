import { action } from 'typesafe-actions';

import { MemberActionTypes, MemberEntity } from '@/types';

/**
 * Fetch all Members.
 */
export const fetchMembers = () =>
  action(MemberActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/members',
  });

/**
 * Create a new Member.
 * @param {MemberEntity} data the Member to create.
 */
export const createMember = (data: MemberEntity) =>
  action(MemberActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/members',
  });

/**
 * Update a Member.
 * @param {MemberEntity} data the Member instance with updated data.
 */
export const updateMember = (data: MemberEntity) =>
  action(MemberActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/members/${data._id}`,
  });

/**
 * Delete Member.
 * @param {MemberEntity} data the Member instance to delete.
 */
export const deleteMember = (data: MemberEntity) =>
  action(MemberActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/members/${data._id}`,
  });

/**
 * Set Member.
 * @param {MemberEntity} data the Member instance to set.
 */
export const setMember = (data: MemberEntity) => action(MemberActionTypes.SET.START, data);

/**
 * Clears Member state
 */
export const clear = () => action(MemberActionTypes.CLEAR);
