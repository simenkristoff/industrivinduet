import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { ContentActionTypes } from '@/types';

import apiCaller from '@/state/utils/apiCaller';

import { createContent, deleteContent, fetchContents, setContent, updateContent } from '../actions';
import contentSaga from '../sagas';

import contentData from './__mockData__/contentData';

describe('content saga', () => {
  it('handle fetch success', () => {
    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), contentData]])
      .put({ type: ContentActionTypes.FETCH.SUCCESS, payload: contentData })
      .dispatch(fetchContents())
      .run();
  });

  it('handle fetch error', () => {
    const error = new Error('fetch error');

    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: ContentActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchContents())
      .run();
  });

  it('handle create success', () => {
    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), contentData[0]]])
      .put({ type: ContentActionTypes.CREATE.SUCCESS, payload: contentData[0] })
      .dispatch(createContent(contentData[0]))
      .run();
  });

  it('handle create error', () => {
    const error = new Error('create error');

    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: ContentActionTypes.CREATE.ERROR, payload: error.message })
      .dispatch(createContent(contentData[0]))
      .run();
  });

  it('handle update success', () => {
    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), contentData[0]]])
      .put({ type: ContentActionTypes.UPDATE.SUCCESS, payload: contentData[0] })
      .dispatch(updateContent(contentData[0]))
      .run();
  });

  it('handle update error', () => {
    const error = new Error('update error');

    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: ContentActionTypes.UPDATE.ERROR, payload: error.message })
      .dispatch(updateContent(contentData[0]))
      .run();
  });

  it('handle delete success', () => {
    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), contentData[0]]])
      .put({ type: ContentActionTypes.DELETE.SUCCESS, payload: contentData[0] })
      .dispatch(deleteContent(contentData[0]))
      .run();
  });

  it('handle delete error', () => {
    const error = new Error('delete error');

    return expectSaga(contentSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: ContentActionTypes.DELETE.ERROR, payload: error.message })
      .dispatch(deleteContent(contentData[0]))
      .run();
  });

  it('handle set success', () => {
    return expectSaga(contentSaga)
      .put({ type: ContentActionTypes.SET.SUCCESS, payload: contentData[0] })
      .dispatch(setContent(contentData[0]))
      .run();
  });
});
