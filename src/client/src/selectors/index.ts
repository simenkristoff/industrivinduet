import { RootState } from '../types';

export const getOptions = (state: RootState) => state.optionsData;
export const getGroups = (state: RootState) => state.groupsData;
export const getRoles = (state: RootState) => state.rolesData;
export const getMembers = (state: RootState) => state.membersData;
export const getEvents = (state: RootState) => state.eventsData;
