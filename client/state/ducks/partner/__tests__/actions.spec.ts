import { action } from 'typesafe-actions';

import { PartnerActionTypes, PartnerEntity } from '@/types';
import partnerData from '@/__mocks__/partnerData';

import {
  clear,
  createPartner,
  deletePartner,
  fetchPartners,
  setPartner,
  updatePartner,
} from '../actions';

describe('partner actions', () => {
  it('should call @@partner.FETCH.START', () => {
    const expectedAction = action(PartnerActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/partners',
    });

    expect(fetchPartners()).toEqual(expectedAction);
  });

  it('should call @@partner.CREATE.START', () => {
    const payload: PartnerEntity = partnerData[1];
    const expectedAction = action(PartnerActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/partners`,
    });

    expect(createPartner(payload)).toEqual(expectedAction);
  });

  it('should call @@partner.UPDATE.START', () => {
    const payload: PartnerEntity = partnerData[1];
    const expectedAction = action(PartnerActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/partners/${payload._id}`,
    });

    expect(updatePartner(payload)).toEqual(expectedAction);
  });

  it('should call @@partner.DELETE.START', () => {
    const payload: PartnerEntity = partnerData[1];
    const expectedAction = action(PartnerActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/partners/${payload._id}`,
    });

    expect(deletePartner(payload)).toEqual(expectedAction);
  });

  it('should call @@partner.SET.START', () => {
    const payload: PartnerEntity = partnerData[1];
    const expectedAction = action(PartnerActionTypes.SET.START, payload);

    expect(setPartner(payload)).toEqual(expectedAction);
  });

  it('should call @partner.CLEAR', () => {
    const expectedAction = action(PartnerActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
