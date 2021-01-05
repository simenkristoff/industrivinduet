import roleTypes from './role.types';

// Types
import { Role } from '../../types';

export const addRoleStart = (roleData: Role) => ({
  type: roleTypes.ADD_NEW_ROLE_START,
  payload: roleData,
});

export const fetchRoleStart = (roleID: string) => ({
  type: roleTypes.FETCH_ROLE_START,
  payload: roleID,
});

export const setRole = (role: Role | Record<string, unknown> | undefined) => ({
  type: roleTypes.SET_ROLE,
  payload: role,
});

export const fetchRolesStart = () => ({
  type: roleTypes.FETCH_ROLES_START,
});

export const setRoles = (roles: Role[]) => ({
  type: roleTypes.SET_ROLES,
  payload: roles,
});

export const updateRoleStart = (role: Role) => ({
  type: roleTypes.UPDATE_ROLE_START,
  payload: role,
});

export const deleteRoleStart = (roleID: string) => ({
  type: roleTypes.DELETE_ROLE_START,
  payload: roleID,
});
