import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, ContentActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';
import contentData from '@/__mocks__/contentData';

import { createContent, deleteContent, fetchContents, setContent, updateContent } from '../actions';
import contentSaga from '../sagas';

describe('content saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), contentData]])
      .put({ type: ContentActionTypes.FETCH.SUCCESS, payload: contentData })
      .dispatch(fetchContents())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: ContentActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchContents())
      .run();
  });

  it('should handle create success', () => {
    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), contentData[0]]])
      .put({ type: ContentActionTypes.CREATE.SUCCESS, payload: contentData[0] })
      .dispatch(createContent(contentData[0]))
      .run();
  });

  it('should handle create error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: ContentActionTypes.CREATE.ERROR, payload: apiResponse })
      .dispatch(createContent(contentData[0]))
      .run();
  });

  it('should handle update success', () => {
    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), contentData[0]]])
      .put({ type: ContentActionTypes.UPDATE.SUCCESS, payload: contentData[0] })
      .dispatch(updateContent(contentData[0]))
      .run();
  });

  it('should handle update error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: ContentActionTypes.UPDATE.ERROR, payload: apiResponse })
      .dispatch(updateContent(contentData[0]))
      .run();
  });

  it('should handle delete success', () => {
    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), contentData[0]]])
      .put({ type: ContentActionTypes.DELETE.SUCCESS, payload: contentData[0] })
      .dispatch(deleteContent(contentData[0]))
      .run();
  });

  it('should handle delete error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: ContentActionTypes.DELETE.ERROR, payload: apiResponse })
      .dispatch(deleteContent(contentData[0]))
      .run();
  });

  it('should handle set success', () => {
    return expectSaga(contentSaga)
      .put({ type: ContentActionTypes.SET.SUCCESS, payload: contentData[0] })
      .dispatch(setContent(contentData[0]))
      .run();
  });
});
