import { action } from 'typesafe-actions';
import { MemberActionTypes } from '@/types';

import { fetchMembers } from '../actions';
import { memberReducer, initialState } from '../reducer';

import memberData from './__mockData__/memberData';

describe('member reducer', () => {
  it('reducer initial', () => {
    expect(memberReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });

  it('reducer fetch start', () => {
    expect(memberReducer(initialState, fetchMembers())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('reducer fetch success', () => {
    expect(
      memberReducer(initialState, action(MemberActionTypes.FETCH.SUCCESS, memberData)),
    ).toEqual({
      ...initialState,
      data: memberData,
    });
  });

  it('reducer create success', () => {
    const currentState = { ...initialState, data: [...memberData] };
    expect(
      memberReducer(currentState, action(MemberActionTypes.CREATE.SUCCESS, memberData[0])),
    ).toEqual({
      ...currentState,
      data: [...memberData, memberData[0]],
    });
  });

  it('reducer update success', () => {
    const currentState = { ...initialState, data: [...memberData] };
    const newMember = { ...memberData[0], name: 'Test gruppe' };
    expect(
      memberReducer(currentState, action(MemberActionTypes.UPDATE.SUCCESS, newMember)),
    ).toEqual({
      ...currentState,
      data: [newMember, ...memberData.slice(1, memberData.length)],
    });
  });

  it('reducer delete success', () => {
    const currentState = { ...initialState, data: [...memberData] };
    expect(
      memberReducer(currentState, action(MemberActionTypes.DELETE.SUCCESS, memberData[0])),
    ).toEqual({
      ...currentState,
      data: memberData.slice(1, memberData.length),
    });
  });

  it('reducer set member', () => {
    expect(memberReducer(initialState, action(MemberActionTypes.SET.START, memberData[0]))).toEqual(
      {
        ...initialState,
        byId: memberData[0],
      },
    );
  });

  it('reducer set member to null', () => {
    const currentState = { ...initialState, byId: memberData[0] };
    expect(memberReducer(currentState, action(MemberActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
});
