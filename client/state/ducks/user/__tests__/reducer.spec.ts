import { action } from 'typesafe-actions';

import { ApiResponse, UserActionTypes } from '@/types';
import userData from '@/__mocks__/userData';

import { userReducer, initialState } from '../reducer';

describe('user reducer', () => {
  it('should equal initial state', () => {
    expect(userReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(userReducer(initialState, { type: UserActionTypes.FETCH.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
    expect(userReducer(initialState, { type: UserActionTypes.CREATE.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
    expect(userReducer(initialState, { type: UserActionTypes.UPDATE.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
    expect(userReducer(initialState, { type: UserActionTypes.DELETE.START, payload: [] })).toEqual({
      ...initialState,
      loading: true,
      status: null,
    });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(userReducer(initialState, action(UserActionTypes.FETCH.SUCCESS, userData))).toEqual({
      ...initialState,
      data: userData,
      loading: false,
    });
  });

  it('should append data on CREATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...userData], loading: true };
    expect(userReducer(currentState, action(UserActionTypes.CREATE.SUCCESS, userData[0]))).toEqual({
      ...currentState,
      data: [...userData, userData[0]],
      loading: false,
    });
  });

  it('should update data on UPDATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...userData], loading: true };
    const newUser = { ...userData[0], name: 'Test gruppe' };
    expect(userReducer(currentState, action(UserActionTypes.UPDATE.SUCCESS, newUser))).toEqual({
      ...currentState,
      data: [newUser, ...userData.slice(1, userData.length)],
      loading: false,
    });
  });

  it('should remove object on DELETE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...userData], loading: true };
    expect(userReducer(currentState, action(UserActionTypes.DELETE.SUCCESS, userData[0]))).toEqual({
      ...currentState,
      data: userData.slice(1, userData.length),
      loading: false,
    });
  });

  it('should set byId on SET.START', () => {
    expect(userReducer(initialState, action(UserActionTypes.SET.START, userData[0]))).toEqual({
      ...initialState,
      byId: userData[0],
    });
  });

  it('should set byId on LOOKUP_REGISTER_TOKEN.SUCCESS', () => {
    expect(
      userReducer(initialState, action(UserActionTypes.LOOKUP_REGISTER_TOKEN.SUCCESS, userData[1])),
    ).toEqual({
      ...initialState,
      byId: userData[1],
    });
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: userData[0] };
    expect(userReducer(currentState, action(UserActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
  it('should set status on all ERROR', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };
    const state = { ...initialState, loading: true };
    const expectedState = { ...initialState, loading: false, status: apiResponse };
    expect(
      userReducer(state, { type: UserActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      userReducer(state, { type: UserActionTypes.CREATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      userReducer(state, { type: UserActionTypes.UPDATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      userReducer(state, { type: UserActionTypes.DELETE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(userReducer(state, { type: UserActionTypes.SET.ERROR, payload: apiResponse })).toEqual({
      ...expectedState,
    });
  });
  it('should clear user state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      userReducer(state, {
        type: UserActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
