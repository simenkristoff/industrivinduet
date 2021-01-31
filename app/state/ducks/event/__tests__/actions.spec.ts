import { action } from 'typesafe-actions';

import { createEvent, deleteEvent, fetchEvents, setEvent, updateEvent } from '../actions';
import { EventActionTypes, EventEntity } from '../types';

import eventData from './__mockData__/eventData';

describe('event actions', () => {
  // FETCH: Test if the correct function is called when fetching Events.
  it('fetch events', () => {
    const expectedAction = action(EventActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/events',
    });

    expect(fetchEvents()).toEqual(expectedAction);
  });

  // CREATE: Test if the correct function is called when creating a Event.
  it('create event', () => {
    const payload: EventEntity = eventData[1];
    const expectedAction = action(EventActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/events`,
    });

    expect(createEvent(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Event.
  it('update event', () => {
    const payload: EventEntity = eventData[1];
    const expectedAction = action(EventActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/events/${payload._id}`,
    });

    expect(updateEvent(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating Event.
  it('delete event', () => {
    const payload: EventEntity = eventData[1];
    const expectedAction = action(EventActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/events/${payload._id}`,
    });

    expect(deleteEvent(payload)).toEqual(expectedAction);
  });

  // SET: Test if the correct function is called when setting Event.
  it('set event', () => {
    const payload: EventEntity = eventData[1];
    const expectedAction = action(EventActionTypes.SET.START, payload);

    expect(setEvent(payload)).toEqual(expectedAction);
  });
});
