import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, EventActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';
import eventData from '@/__mocks__/eventData';

import {
  createEvent,
  deleteEvent,
  fetchEvent,
  fetchEvents,
  setEvent,
  updateEvent,
} from '../actions';
import eventSaga from '../sagas';

describe('event saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), eventData]])
      .put({ type: EventActionTypes.FETCH.SUCCESS, payload: eventData })
      .dispatch(fetchEvents())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: EventActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchEvents())
      .run();
  });

  it('should handle fetch one success', () => {
    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), eventData[0]]])
      .put({ type: EventActionTypes.FETCH_ONE.SUCCESS, payload: eventData[0] })
      .dispatch(fetchEvent('event1'))
      .run();
  });

  it('should handle fetch one error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: EventActionTypes.FETCH_ONE.ERROR, payload: apiResponse })
      .dispatch(fetchEvent('event1'))
      .run();
  });

  it('should handle create success', () => {
    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), eventData[0]]])
      .put({ type: EventActionTypes.CREATE.SUCCESS, payload: eventData[0] })
      .dispatch(createEvent(eventData[0]))
      .run();
  });

  it('should handle create error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: EventActionTypes.CREATE.ERROR, payload: apiResponse })
      .dispatch(createEvent(eventData[0]))
      .run();
  });

  it('should handle update success', () => {
    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), eventData[0]]])
      .put({ type: EventActionTypes.UPDATE.SUCCESS, payload: eventData[0] })
      .dispatch(updateEvent(eventData[0]))
      .run();
  });

  it('should handle update error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: EventActionTypes.UPDATE.ERROR, payload: apiResponse })
      .dispatch(updateEvent(eventData[0]))
      .run();
  });

  it('should handle delete success', () => {
    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), eventData[0]]])
      .put({ type: EventActionTypes.DELETE.SUCCESS, payload: eventData[0] })
      .dispatch(deleteEvent(eventData[0]))
      .run();
  });

  it('should handle delete error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(eventSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: EventActionTypes.DELETE.ERROR, payload: apiResponse })
      .dispatch(deleteEvent(eventData[0]))
      .run();
  });

  it('should handle set success', () => {
    return expectSaga(eventSaga)
      .put({ type: EventActionTypes.SET.SUCCESS, payload: eventData[0] })
      .dispatch(setEvent(eventData[0]))
      .run();
  });
});
