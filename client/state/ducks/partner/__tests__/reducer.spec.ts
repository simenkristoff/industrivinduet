import { action } from 'typesafe-actions';

import { fetchPartners } from '../actions';
import { partnerReducer, initialState } from '../reducer';
import { PartnerActionTypes, PartnerEntity } from '../types';

import partnerData from './__mockData__/partnerData';

describe('partner reducer', () => {
  it('reducer initial', () => {
    expect(partnerReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });

  it('reducer fetch start', () => {
    expect(partnerReducer(initialState, fetchPartners())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('reducer fetch success', () => {
    expect(
      partnerReducer(initialState, action(PartnerActionTypes.FETCH.SUCCESS, partnerData)),
    ).toEqual({
      ...initialState,
      data: partnerData,
    });
  });

  it('reducer create success', () => {
    const currentState = { ...initialState, data: [...partnerData] };
    expect(
      partnerReducer(currentState, action(PartnerActionTypes.CREATE.SUCCESS, partnerData[0])),
    ).toEqual({
      ...currentState,
      data: [...partnerData, partnerData[0]],
    });
  });

  it('reducer update success', () => {
    const currentState = { ...initialState, data: [...partnerData] };
    const newPartner = { ...partnerData[0], name: 'Test gruppe' };
    expect(
      partnerReducer(currentState, action(PartnerActionTypes.UPDATE.SUCCESS, newPartner)),
    ).toEqual({
      ...currentState,
      data: [newPartner, ...partnerData.slice(1, partnerData.length)],
    });
  });

  it('reducer delete success', () => {
    const currentState = { ...initialState, data: [...partnerData] };
    expect(
      partnerReducer(currentState, action(PartnerActionTypes.DELETE.SUCCESS, partnerData[0])),
    ).toEqual({
      ...currentState,
      data: partnerData.slice(1, partnerData.length),
    });
  });

  it('reducer set partner', () => {
    expect(
      partnerReducer(initialState, action(PartnerActionTypes.SET.SUCCESS, partnerData[0])),
    ).toEqual({
      ...initialState,
      byId: partnerData[0],
    });
  });

  it('reducer set partner to null', () => {
    const currentState = { ...initialState, byId: partnerData[0] };
    expect(partnerReducer(currentState, action(PartnerActionTypes.SET.SUCCESS, {}))).toEqual({
      ...initialState,
    });
  });
});
