import { action } from 'typesafe-actions';

import { ApiResponse, PartnerActionTypes } from '@/types';
import partnerData from '@/__mocks__/partnerData';

import { partnerReducer, initialState } from '../reducer';

describe('partner reducer', () => {
  it('should equal initial state', () => {
    expect(partnerReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(
      partnerReducer(initialState, { type: PartnerActionTypes.FETCH.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      partnerReducer(initialState, { type: PartnerActionTypes.CREATE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      partnerReducer(initialState, {
        type: PartnerActionTypes.UPDATE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      partnerReducer(initialState, { type: PartnerActionTypes.DELETE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(
      partnerReducer(initialState, action(PartnerActionTypes.FETCH.SUCCESS, partnerData)),
    ).toEqual({
      ...initialState,
      data: partnerData,
      loading: false,
    });
  });

  it('should append data on CREATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...partnerData], loading: true };
    expect(
      partnerReducer(currentState, action(PartnerActionTypes.CREATE.SUCCESS, partnerData[0])),
    ).toEqual({
      ...currentState,
      data: [...partnerData, partnerData[0]],
      loading: false,
    });
  });

  it('should update data on UPDATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...partnerData], loading: true };
    const newPartner = { ...partnerData[0], name: 'Test gruppe' };
    expect(
      partnerReducer(currentState, action(PartnerActionTypes.UPDATE.SUCCESS, newPartner)),
    ).toEqual({
      ...currentState,
      data: [newPartner, ...partnerData.slice(1, partnerData.length)],
      loading: false,
    });
  });

  it('should remove object on DELETE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...partnerData], loading: true };
    expect(
      partnerReducer(currentState, action(PartnerActionTypes.DELETE.SUCCESS, partnerData[0])),
    ).toEqual({
      ...currentState,
      data: partnerData.slice(1, partnerData.length),
      loading: false,
    });
  });

  it('should set byId on SET.START', () => {
    expect(
      partnerReducer(initialState, action(PartnerActionTypes.SET.START, partnerData[0])),
    ).toEqual({
      ...initialState,
      byId: partnerData[0],
    });
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: partnerData[0] };
    expect(partnerReducer(currentState, action(PartnerActionTypes.SET.START, {}))).toEqual({
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
      partnerReducer(state, { type: PartnerActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      partnerReducer(state, { type: PartnerActionTypes.CREATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      partnerReducer(state, { type: PartnerActionTypes.UPDATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      partnerReducer(state, { type: PartnerActionTypes.DELETE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      partnerReducer(state, { type: PartnerActionTypes.SET.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should clear partner state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      partnerReducer(state, {
        type: PartnerActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
