import { action } from 'typesafe-actions';

import { EventActionTypes, EventEntity } from '@/types';
import eventData from '@/__mocks__/eventData';

import {
  clear,
  createEvent,
  deleteEvent,
  fetchActiveEvents,
  fetchEvent,
  fetchEvents,
  setEvent,
  updateEvent,
} from '../actions';

describe('event actions', () => {
  it('should call @@event.FETCH.START', () => {
    const expectedAction = action(EventActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/events',
    });

    expect(fetchEvents()).toEqual(expectedAction);
  });

  it('should call @@event.FETCH.START with query params', () => {
    const expectedAction = action(EventActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/events/active?limit=3',
    });

    expect(fetchActiveEvents(3)).toEqual(expectedAction);
  });

  it('should call @@event.FETCH_ONE.START', () => {
    const expectedAction = action(EventActionTypes.FETCH_ONE.START, [], {
      method: 'get',
      route: 'api/events/123',
    });

    expect(fetchEvent('123')).toEqual(expectedAction);
  });

  it('should call @@event.CREATE.START', () => {
    const payload: EventEntity = eventData[1];
    const expectedAction = action(EventActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/events`,
    });

    expect(createEvent(payload)).toEqual(expectedAction);
  });

  it('should call @@event.UPDATE.START', () => {
    const payload: EventEntity = eventData[1];
    const expectedAction = action(EventActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/events/${payload._id}`,
    });

    expect(updateEvent(payload)).toEqual(expectedAction);
  });

  it('should call @@event.DELETE.START', () => {
    const payload: EventEntity = eventData[1];
    const expectedAction = action(EventActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/events/${payload._id}`,
    });

    expect(deleteEvent(payload)).toEqual(expectedAction);
  });

  it('should call @@event.SET.START', () => {
    const payload: EventEntity = eventData[1];
    const expectedAction = action(EventActionTypes.SET.START, payload);

    expect(setEvent(payload)).toEqual(expectedAction);
  });

  it('should call @event.CLEAR', () => {
    const expectedAction = action(EventActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
