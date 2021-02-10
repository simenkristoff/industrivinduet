import { action } from 'typesafe-actions';
import { UserActionTypes, UserEntity } from '@/types';

import { createUser, deleteUser, fetchUsers, setUser, updateUser } from '../actions';

import userData from './__mockData__/userData';

describe('user actions', () => {
  // FETCH: Test if the correct function is called when fetching Users.
  it('fetch users', () => {
    const expectedAction = action(UserActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/users',
    });

    expect(fetchUsers()).toEqual(expectedAction);
  });

  // CREATE: Test if the correct function is called when creating a User.
  it('create user', () => {
    const payload: UserEntity = userData[1];
    const expectedAction = action(UserActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/users`,
    });

    expect(createUser(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating User.
  it('update user', () => {
    const payload: UserEntity = userData[1];
    const expectedAction = action(UserActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/users/${payload._id}`,
    });

    expect(updateUser(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating User.
  it('delete user', () => {
    const payload: UserEntity = userData[1];
    const expectedAction = action(UserActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/users/${payload._id}`,
    });

    expect(deleteUser(payload)).toEqual(expectedAction);
  });

  // SET: Test if the correct function is called when setting User.
  it('set user', () => {
    const payload: UserEntity = userData[1];
    const expectedAction = action(UserActionTypes.SET.START, payload);

    expect(setUser(payload)).toEqual(expectedAction);
  });
});
