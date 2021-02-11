import { action } from 'typesafe-actions';
import { UserActionTypes } from '@/types';

import { fetchUsers } from '../actions';
import { userReducer, initialState } from '../reducer';

import userData from './__mockData__/userData';

describe('user reducer', () => {
  it('reducer initial', () => {
    expect(userReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });

  it('reducer fetch start', () => {
    expect(userReducer(initialState, fetchUsers())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('reducer fetch success', () => {
    expect(userReducer(initialState, action(UserActionTypes.FETCH.SUCCESS, userData))).toEqual({
      ...initialState,
      data: userData,
    });
  });

  it('reducer create success', () => {
    const currentState = { ...initialState, data: [...userData] };
    expect(userReducer(currentState, action(UserActionTypes.CREATE.SUCCESS, userData[0]))).toEqual({
      ...currentState,
      data: [...userData, userData[0]],
    });
  });

  it('reducer update success', () => {
    const currentState = { ...initialState, data: [...userData] };
    const newUser = { ...userData[0], name: 'Test gruppe' };
    expect(userReducer(currentState, action(UserActionTypes.UPDATE.SUCCESS, newUser))).toEqual({
      ...currentState,
      data: [newUser, ...userData.slice(1, userData.length)],
    });
  });

  it('reducer delete success', () => {
    const currentState = { ...initialState, data: [...userData] };
    expect(userReducer(currentState, action(UserActionTypes.DELETE.SUCCESS, userData[0]))).toEqual({
      ...currentState,
      data: userData.slice(1, userData.length),
    });
  });

  it('reducer set user', () => {
    expect(userReducer(initialState, action(UserActionTypes.SET.START, userData[0]))).toEqual({
      ...initialState,
      byId: userData[0],
    });
  });

  it('reducer set user to null', () => {
    const currentState = { ...initialState, byId: userData[0] };
    expect(userReducer(currentState, action(UserActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
});
