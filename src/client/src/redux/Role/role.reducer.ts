import roleTypes from './role.types';

const INITIAL_STATE = {
  roles: [],
  role: {},
};

const roleReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case roleTypes.SET_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case roleTypes.SET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    default:
      return state;
  }
};

export default roleReducer;
