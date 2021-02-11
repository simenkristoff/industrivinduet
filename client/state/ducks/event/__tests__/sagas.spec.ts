import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { EventActionTypes } from '@/types';

import apiCaller from '@/state/utils/apiCaller';

import { createEvent, deleteEvent, fetchEvents, setEvent, updateEvent } from '../actions';
import eventSaga from '../sagas';

import eventData from './__mockData__/eventData';

describe('event saga', () => {
  it('handle fetch success', () => {
    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), eventData]])
      .put({ type: EventActionTypes.FETCH.SUCCESS, payload: eventData })
      .dispatch(fetchEvents())
      .run();
  });

  it('handle fetch error', () => {
    const error = new Error('fetch error');

    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: EventActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchEvents())
      .run();
  });

  it('handle create success', () => {
    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), eventData[0]]])
      .put({ type: EventActionTypes.CREATE.SUCCESS, payload: eventData[0] })
      .dispatch(createEvent(eventData[0]))
      .run();
  });

  it('handle create error', () => {
    const error = new Error('create error');

    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: EventActionTypes.CREATE.ERROR, payload: error.message })
      .dispatch(createEvent(eventData[0]))
      .run();
  });

  it('handle update success', () => {
    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), eventData[0]]])
      .put({ type: EventActionTypes.UPDATE.SUCCESS, payload: eventData[0] })
      .dispatch(updateEvent(eventData[0]))
      .run();
  });

  it('handle update error', () => {
    const error = new Error('update error');

    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: EventActionTypes.UPDATE.ERROR, payload: error.message })
      .dispatch(updateEvent(eventData[0]))
      .run();
  });

  it('handle delete success', () => {
    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), eventData[0]]])
      .put({ type: EventActionTypes.DELETE.SUCCESS, payload: eventData[0] })
      .dispatch(deleteEvent(eventData[0]))
      .run();
  });

  it('handle delete error', () => {
    const error = new Error('delete error');

    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: EventActionTypes.DELETE.ERROR, payload: error.message })
      .dispatch(deleteEvent(eventData[0]))
      .run();
  });

  it('handle set success', () => {
    return expectSaga(eventSaga)
      .put({ type: EventActionTypes.SET.SUCCESS, payload: eventData[0] })
      .dispatch(setEvent(eventData[0]))
      .run();
  });
});
