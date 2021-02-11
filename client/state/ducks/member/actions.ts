import { action } from 'typesafe-actions';
import { MemberActionTypes, MemberEntity } from '@/types';

/**
 * @desc Fetch all Members.
 */
export const fetchMembers = () =>
  action(MemberActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/members',
  });

/**
 * @desc Create a new Member.
 * @param {MemberEntity} data the Member to create.
 */
export const createMember = (data: MemberEntity) =>
  action(MemberActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/members',
  });

/**
 * @desc Update a Member.
 * @param {MemberEntity} data the Member instance with updated data.
 */
export const updateMember = (data: MemberEntity) =>
  action(MemberActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/members/${data._id}`,
  });

/**
 * @desc Delete Member.
 * @param {MemberEntity} data the Member instance to delete.
 */
export const deleteMember = (data: MemberEntity) =>
  action(MemberActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/members/${data._id}`,
  });

/**
 * @desc Set Member.
 * @param {MemberEntity} data the Member instance to set.
 */
export const setMember = (data: MemberEntity) => action(MemberActionTypes.SET.START, data);
