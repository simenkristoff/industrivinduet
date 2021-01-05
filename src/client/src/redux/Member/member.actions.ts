import memberTypes from './member.types';

// Types
import { Member } from '../../types';

export const addMemberStart = (memberData: Member) => ({
  type: memberTypes.ADD_NEW_MEMBER_START,
  payload: memberData,
});

export const fetchMemberStart = (memberID: string) => ({
  type: memberTypes.FETCH_MEMBER_START,
  payload: memberID,
});

export const setMember = (member: Member | Record<string, unknown> | undefined) => ({
  type: memberTypes.SET_MEMBER,
  payload: member,
});

export const fetchMembersStart = () => ({
  type: memberTypes.FETCH_MEMBERS_START,
});

export const setMembers = (members: Member[]) => ({
  type: memberTypes.SET_MEMBERS,
  payload: members,
});

export const updateMemberStart = (member: Member) => ({
  type: memberTypes.UPDATE_MEMBER_START,
  payload: member,
});

export const deleteMemberStart = (memberID: string) => ({
  type: memberTypes.DELETE_MEMBER_START,
  payload: memberID,
});
