import { action } from 'typesafe-actions';
import { AuthActionTypes } from '@/types';

import { register, login, logout } from '../actions';

import { authLogin, authRegister, authUser } from './__mockData__/authData';

describe('auth actions', () => {
  /**
   * REGISTER: Test if the correct function is called when registering User
   */
  it('register user', () => {
    const expectedAction = action(AuthActionTypes.REGISTER.START, authUser, {
      method: 'post',
      route: 'auth/register',
    });

    expect(register(authRegister)).toEqual(expectedAction);
  });

  /**
   * LOGIN: Test if the correct function is called when logging in User
   */
  it('login user', () => {
    const expectedAction = action(AuthActionTypes.LOGIN.START, authLogin, {
      method: 'post',
      route: `auth/login`,
    });

    expect(login(authLogin)).toEqual(expectedAction);
  });

  /**
   * LOGOUT: Test if the correct function is called when loggin out User
   */
  it('logout user', () => {
    const expectedAction = action(AuthActionTypes.LOGOUT.START);

    expect(logout()).toEqual(expectedAction);
  });
});
