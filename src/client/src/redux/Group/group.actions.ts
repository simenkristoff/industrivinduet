import groupTypes from './group.types';

// Types
import { Group } from '../../types';

export const addGroupStart = (groupData: Group) => ({
  type: groupTypes.ADD_NEW_GROUP_START,
  payload: groupData,
});

export const fetchGroupStart = (groupID: string) => ({
  type: groupTypes.FETCH_GROUP_START,
  payload: groupID,
});

export const setGroup = (group: Group | Record<string, unknown> | undefined) => ({
  type: groupTypes.SET_GROUP,
  payload: group,
});

export const fetchGroupsStart = () => ({
  type: groupTypes.FETCH_GROUPS_START,
});

export const setGroups = (groups: Group[]) => ({
  type: groupTypes.SET_GROUPS,
  payload: groups,
});

export const updateGroupStart = (group: Group) => ({
  type: groupTypes.UPDATE_GROUP_START,
  payload: group,
});

export const deleteGroupStart = (groupID: string) => ({
  type: groupTypes.DELETE_GROUP_START,
  payload: groupID,
});
