import { action } from 'typesafe-actions';

import { UserActionTypes, UserEntity } from '@/types';

import {
  clear,
  createUser,
  deleteUser,
  fetchUsers,
  lookupRegisterToken,
  setUser,
  updateUser,
} from '../actions';

import userData, { registerTokenData } from './__mockData__/userData';

describe('user actions', () => {
  it('should call @@user.FETCH.START', () => {
    const expectedAction = action(UserActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/users',
    });

    expect(fetchUsers()).toEqual(expectedAction);
  });

  it('should call @@user.CREATE.START', () => {
    const payload: UserEntity = userData[1];
    const expectedAction = action(UserActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/users`,
    });

    expect(createUser(payload)).toEqual(expectedAction);
  });

  it('should call @@user.UPDATE.START', () => {
    const payload: UserEntity = userData[1];
    const expectedAction = action(UserActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/users/${payload._id}`,
    });

    expect(updateUser(payload)).toEqual(expectedAction);
  });

  it('should call @@user.DELETE.START', () => {
    const payload: UserEntity = userData[1];
    const expectedAction = action(UserActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/users/${payload._id}`,
    });

    expect(deleteUser(payload)).toEqual(expectedAction);
  });

  it('should call @@user.LOOKUP_REGISTER_TOKEN.START', () => {
    const expectedAction = action(UserActionTypes.LOOKUP_REGISTER_TOKEN.START, registerTokenData, {
      method: 'post',
      route: `api/users/lookup`,
    });

    expect(lookupRegisterToken(registerTokenData)).toEqual(expectedAction);
  });

  it('should call @@user.SET.START', () => {
    const payload: UserEntity = userData[1];
    const expectedAction = action(UserActionTypes.SET.START, payload);

    expect(setUser(payload)).toEqual(expectedAction);
  });

  it('should call @user.CLEAR', () => {
    const expectedAction = action(UserActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
