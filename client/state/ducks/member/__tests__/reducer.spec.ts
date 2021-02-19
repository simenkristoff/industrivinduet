import { action } from 'typesafe-actions';

import memberData from '@/__mocks__/memberData';
import { ApiResponse, MemberActionTypes } from '@/types';

import { memberReducer, initialState } from '../reducer';

describe('member reducer', () => {
  it('should equal initial state', () => {
    expect(memberReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(
      memberReducer(initialState, { type: MemberActionTypes.FETCH.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      memberReducer(initialState, { type: MemberActionTypes.CREATE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      memberReducer(initialState, {
        type: MemberActionTypes.UPDATE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      memberReducer(initialState, { type: MemberActionTypes.DELETE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(
      memberReducer(initialState, action(MemberActionTypes.FETCH.SUCCESS, memberData)),
    ).toEqual({
      ...initialState,
      data: memberData,
      loading: false,
    });
  });

  it('should append data on CREATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...memberData], loading: true };
    expect(
      memberReducer(currentState, action(MemberActionTypes.CREATE.SUCCESS, memberData[0])),
    ).toEqual({
      ...currentState,
      data: [...memberData, memberData[0]],
      loading: false,
    });
  });

  it('should update data on UPDATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...memberData], loading: true };
    const newMember = { ...memberData[0], name: 'Test gruppe' };
    expect(
      memberReducer(currentState, action(MemberActionTypes.UPDATE.SUCCESS, newMember)),
    ).toEqual({
      ...currentState,
      data: [newMember, ...memberData.slice(1, memberData.length)],
      loading: false,
    });
  });

  it('should remove object on DELETE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...memberData], loading: true };
    expect(
      memberReducer(currentState, action(MemberActionTypes.DELETE.SUCCESS, memberData[0])),
    ).toEqual({
      ...currentState,
      data: memberData.slice(1, memberData.length),
      loading: false,
    });
  });

  it('should set byId on SET.START', () => {
    expect(memberReducer(initialState, action(MemberActionTypes.SET.START, memberData[0]))).toEqual(
      {
        ...initialState,
        byId: memberData[0],
      },
    );
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: memberData[0] };
    expect(memberReducer(currentState, action(MemberActionTypes.SET.START, {}))).toEqual({
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
      memberReducer(state, { type: MemberActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      memberReducer(state, { type: MemberActionTypes.CREATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      memberReducer(state, { type: MemberActionTypes.UPDATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      memberReducer(state, { type: MemberActionTypes.DELETE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      memberReducer(state, { type: MemberActionTypes.SET.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should clear member state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      memberReducer(state, {
        type: MemberActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
