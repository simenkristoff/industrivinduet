import roleTypes from './role.types';

export const addRoleStart = roleData => ({
    type: roleTypes.ADD_NEW_ROLE_START,
    payload: roleData
});

export const fetchRoleStart = roleID => ({
    type: roleTypes.FETCH_ROLE_START,
    payload: roleID
});

export const setRole = role => ({
    type: roleTypes.SET_ROLE,
    payload: role
});

export const fetchRolesStart = () => ({
    type: roleTypes.FETCH_ROLES_START
});

export const setRoles = roles => ({
    type: roleTypes.SET_ROLES,
    payload: roles
});

export const updateRoleStart = role => ({
    type: roleTypes.UPDATE_ROLE_START,
    payload: role
});

export const deleteRoleStart = roleID => ({
    type: roleTypes.DELETE_ROLE_START,
    payload: roleID
});
