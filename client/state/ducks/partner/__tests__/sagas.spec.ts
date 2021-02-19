import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, PartnerActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';
import partnerData from '@/__mocks__/partnerData';

import { createPartner, deletePartner, fetchPartners, setPartner, updatePartner } from '../actions';
import partnerSaga from '../sagas';

describe('partner saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), partnerData]])
      .put({ type: PartnerActionTypes.FETCH.SUCCESS, payload: partnerData })
      .dispatch(fetchPartners())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: PartnerActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchPartners())
      .run();
  });

  it('should handle create success', () => {
    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), partnerData[0]]])
      .put({ type: PartnerActionTypes.CREATE.SUCCESS, payload: partnerData[0] })
      .dispatch(createPartner(partnerData[0]))
      .run();
  });

  it('should handle create error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: PartnerActionTypes.CREATE.ERROR, payload: apiResponse })
      .dispatch(createPartner(partnerData[0]))
      .run();
  });

  it('should handle update success', () => {
    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), partnerData[0]]])
      .put({ type: PartnerActionTypes.UPDATE.SUCCESS, payload: partnerData[0] })
      .dispatch(updatePartner(partnerData[0]))
      .run();
  });

  it('should handle update error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: PartnerActionTypes.UPDATE.ERROR, payload: apiResponse })
      .dispatch(updatePartner(partnerData[0]))
      .run();
  });

  it('should handle delete success', () => {
    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), partnerData[0]]])
      .put({ type: PartnerActionTypes.DELETE.SUCCESS, payload: partnerData[0] })
      .dispatch(deletePartner(partnerData[0]))
      .run();
  });

  it('should handle delete error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(partnerSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: PartnerActionTypes.DELETE.ERROR, payload: apiResponse })
      .dispatch(deletePartner(partnerData[0]))
      .run();
  });

  it('should handle set success', () => {
    return expectSaga(partnerSaga)
      .put({ type: PartnerActionTypes.SET.SUCCESS, payload: partnerData[0] })
      .dispatch(setPartner(partnerData[0]))
      .run();
  });
});
