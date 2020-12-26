import memberTypes from './member.types';

export const addMemberStart = memberData => ({
    type: memberTypes.ADD_NEW_MEMBER_START,
    payload: memberData
});

export const fetchMemberStart = memberID => ({
    type: memberTypes.FETCH_MEMBER_START,
    payload: memberID
});

export const setMember = member => ({
    type: memberTypes.SET_MEMBER,
    payload: member
});

export const fetchMembersStart = () => ({
    type: memberTypes.FETCH_MEMBERS_START
});

export const setMembers = members => ({
    type: memberTypes.SET_MEMBERS,
    payload: members
});

export const updateMemberStart = member => ({
    type: memberTypes.UPDATE_MEMBER_START,
    payload: member
});

export const deleteMemberStart = memberID => ({
    type: memberTypes.DELETE_MEMBER_START,
    payload: memberID
});
