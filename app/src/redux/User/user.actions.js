import userTypes from './user.types';

export const loginUserStart = userCredentials => ({
    type: userTypes.LOGIN_USER_START,
    payload: userCredentials
});

export const loginUserSuccess = user => ({
    type: userTypes.LOGIN_USER_SUCCESS,
    payload: user
});

export const logoutUserStart = () => ({
    type: userTypes.LOGOUT_USER_START
});

export const logoutUserSuccess = () => ({
    type: userTypes.LOGOUT_USER_SUCCESS
});

export const registerUserStart = userCredentials => ({
    type: userTypes.REGISTER_USER_START,
    payload: userCredentials
});

export const userError = err => ({
    type: userTypes.USER_ERROR,
    payload: err
});
