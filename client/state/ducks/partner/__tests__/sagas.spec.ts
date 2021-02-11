import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { PartnerActionTypes } from '@/types';

import apiCaller from '@/state/utils/apiCaller';

import { createPartner, deletePartner, fetchPartners, setPartner, updatePartner } from '../actions';
import partnerSaga from '../sagas';

import partnerData from './__mockData__/partnerData';

describe('partner saga', () => {
  it('handle fetch success', () => {
    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), partnerData]])
      .put({ type: PartnerActionTypes.FETCH.SUCCESS, payload: partnerData })
      .dispatch(fetchPartners())
      .run();
  });

  it('handle fetch error', () => {
    const error = new Error('fetch error');

    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: PartnerActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchPartners())
      .run();
  });

  it('handle create success', () => {
    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), partnerData[0]]])
      .put({ type: PartnerActionTypes.CREATE.SUCCESS, payload: partnerData[0] })
      .dispatch(createPartner(partnerData[0]))
      .run();
  });

  it('handle create error', () => {
    const error = new Error('create error');

    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: PartnerActionTypes.CREATE.ERROR, payload: error.message })
      .dispatch(createPartner(partnerData[0]))
      .run();
  });

  it('handle update success', () => {
    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), partnerData[0]]])
      .put({ type: PartnerActionTypes.UPDATE.SUCCESS, payload: partnerData[0] })
      .dispatch(updatePartner(partnerData[0]))
      .run();
  });

  it('handle update error', () => {
    const error = new Error('update error');

    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: PartnerActionTypes.UPDATE.ERROR, payload: error.message })
      .dispatch(updatePartner(partnerData[0]))
      .run();
  });

  it('handle delete success', () => {
    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), partnerData[0]]])
      .put({ type: PartnerActionTypes.DELETE.SUCCESS, payload: partnerData[0] })
      .dispatch(deletePartner(partnerData[0]))
      .run();
  });

  it('handle delete error', () => {
    const error = new Error('delete error');

    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: PartnerActionTypes.DELETE.ERROR, payload: error.message })
      .dispatch(deletePartner(partnerData[0]))
      .run();
  });

  it('handle set success', () => {
    return expectSaga(partnerSaga)
      .put({ type: PartnerActionTypes.SET.SUCCESS, payload: partnerData[0] })
      .dispatch(setPartner(partnerData[0]))
      .run();
  });
});
