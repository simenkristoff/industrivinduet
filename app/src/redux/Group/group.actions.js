import groupTypes from './group.types';

export const addGroupStart = groupData => ({
    type: groupTypes.ADD_NEW_GROUP_START,
    payload: groupData
});

export const fetchGroupStart = groupID => ({
    type: groupTypes.FETCH_GROUP_START,
    payload: groupID
});

export const setGroup = group => ({
    type: groupTypes.SET_GROUP,
    payload: group
});

export const fetchGroupsStart = () => ({
    type: groupTypes.FETCH_GROUPS_START
});

export const setGroups = groups => ({
    type: groupTypes.SET_GROUPS,
    payload: groups
});

export const updateGroupStart = group => ({
    type: groupTypes.UPDATE_GROUP_START,
    payload: group
});

export const deleteGroupStart = groupID => ({
    type: groupTypes.DELETE_GROUP_START,
    payload: groupID
});
