import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, OptionActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';

import { fetchOptions, updateOptions, resetOptions } from '../actions';
import optionSaga from '../sagas';

import optionData from './__mockData__/optionData';

describe('option saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(optionSaga)
      .provide([[matchers.call.fn(apiCaller), optionData]])
      .put({ type: OptionActionTypes.FETCH.SUCCESS, payload: optionData })
      .dispatch(fetchOptions())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(optionSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: OptionActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchOptions())
      .run();
  });

  it('should handle update success', () => {
    return expectSaga(optionSaga)
      .provide([[matchers.call.fn(apiCaller), optionData]])
      .put({ type: OptionActionTypes.UPDATE.SUCCESS, payload: optionData })
      .dispatch(updateOptions(optionData))
      .run();
  });

  it('should handle update error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(optionSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: OptionActionTypes.UPDATE.ERROR, payload: apiResponse })
      .dispatch(updateOptions(optionData))
      .run();
  });

  it('should handle reset success', () => {
    return expectSaga(optionSaga)
      .provide([[matchers.call.fn(apiCaller), optionData]])
      .put({ type: OptionActionTypes.RESET.SUCCESS, payload: optionData })
      .dispatch(resetOptions())
      .run();
  });

  it('should handle reset error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(optionSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: OptionActionTypes.RESET.ERROR, payload: apiResponse })
      .dispatch(resetOptions())
      .run();
  });
});
