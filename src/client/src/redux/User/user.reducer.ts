import userTypes from './user.types';

const currentUser = JSON.parse(localStorage.getItem('user')!);

const INITIAL_STATE = currentUser ? { isLoggedIn: true, currentUser, userErr: [] } : { isLoggedIn: false, currentUser: null, userErr: [] };

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case userTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        currentUser: action.payload,
        userErr: [],
      };
    case userTypes.USER_ERROR:
      return {
        ...state,
        userErr: action.payload,
      };
    case userTypes.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default userReducer;
