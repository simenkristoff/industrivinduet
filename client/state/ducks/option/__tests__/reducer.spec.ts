import { action } from 'typesafe-actions';

import { ApiResponse, OptionActionTypes } from '@/types';

import { optionReducer, initialState } from '../reducer';

import optionData from './__mockData__/optionData';

describe('option reducer', () => {
  it('should equal initial state', () => {
    expect(optionReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(
      optionReducer(initialState, { type: OptionActionTypes.FETCH.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      optionReducer(initialState, {
        type: OptionActionTypes.UPDATE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      optionReducer(initialState, { type: OptionActionTypes.RESET.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
  });
  it('should set option data on *.SUCCESS', () => {
    const successState = {
      ...initialState,
      _id: optionData._id,
      general: optionData.general,
      event: optionData.event,
      job: optionData.job,
      socials: optionData.socials,
      loading: false,
    };
    expect(
      optionReducer(initialState, action(OptionActionTypes.FETCH.SUCCESS, optionData)),
    ).toEqual(successState);
    expect(
      optionReducer(initialState, action(OptionActionTypes.UPDATE.SUCCESS, optionData)),
    ).toEqual(successState);
    expect(
      optionReducer(initialState, action(OptionActionTypes.RESET.SUCCESS, optionData)),
    ).toEqual(successState);
  });

  it('should set status on all ERROR', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };
    const state = { ...initialState, loading: true };
    const expectedState = { ...initialState, loading: false, status: apiResponse };
    expect(
      optionReducer(state, { type: OptionActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      optionReducer(state, { type: OptionActionTypes.UPDATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      optionReducer(state, { type: OptionActionTypes.RESET.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should clear option state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      optionReducer(state, {
        type: OptionActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
