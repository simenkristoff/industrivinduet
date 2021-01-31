import { action } from 'typesafe-actions';

import { createPartner, deletePartner, fetchPartners, setPartner, updatePartner } from '../actions';
import { PartnerActionTypes, PartnerEntity } from '../types';

import partnerData from './__mockData__/partnerData';

describe('partner actions', () => {
  // FETCH: Test if the correct function is called when fetching Partners.
  it('fetch partners', () => {
    const expectedAction = action(PartnerActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/partners',
    });

    expect(fetchPartners()).toEqual(expectedAction);
  });

  // CREATE: Test if the correct function is called when creating a Partner.
  it('create partner', () => {
    const payload: PartnerEntity = partnerData[1];
    const expectedAction = action(PartnerActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/partners`,
    });

    expect(createPartner(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Partner.
  it('update partner', () => {
    const payload: PartnerEntity = partnerData[1];
    const expectedAction = action(PartnerActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/partners/${payload._id}`,
    });

    expect(updatePartner(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Partner.
  it('delete partner', () => {
    const payload: PartnerEntity = partnerData[1];
    const expectedAction = action(PartnerActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/partners/${payload._id}`,
    });

    expect(deletePartner(payload)).toEqual(expectedAction);
  });

  // SET: Test if the correct function is called when setting Partner.
  it('set partner', () => {
    const payload: PartnerEntity = partnerData[1];
    const expectedAction = action(PartnerActionTypes.SET.START, payload);

    expect(setPartner(payload)).toEqual(expectedAction);
  });
});
