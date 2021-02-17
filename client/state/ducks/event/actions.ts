import { action } from 'typesafe-actions';

import { ObjectId } from '@/state/interface';
import { EventActionTypes, EventEntity } from '@/types';

/**
 * Fetch all Events.
 */
export const fetchEvents = () => {
  return action(EventActionTypes.FETCH.START, [], {
    method: 'get',
    route: 'api/events',
  });
};

/**
 * Fetch all active Events.
 * @param {number} limit how many active Events to fetch
 */
export const fetchActiveEvents = (limit?: number) => {
  let query = '';
  if (limit) {
    query = `?limit=${limit}`;
  }

  return action(EventActionTypes.FETCH.START, [], {
    method: 'get',
    route: `api/events/active${query}`,
  });
};

/**
 * Fetch single Event by ID.
 * @param {ObjectId} id the ID of the Event to fetch
 */
export const fetchEvent = (id: ObjectId) =>
  action(EventActionTypes.FETCH_ONE.START, [], {
    method: 'get',
    route: `api/events/${id}`,
  });

/**
 * Create a new Event.
 * @param {EventEntity} data the Event to create.
 */
export const createEvent = (data: EventEntity) =>
  action(EventActionTypes.CREATE.START, data, {
    method: 'post',
    route: 'api/events',
  });

/**
 * Update a Event.
 * @param {EventEntity} data the Event instance with updated data.
 */
export const updateEvent = (data: EventEntity) =>
  action(EventActionTypes.UPDATE.START, data, {
    method: 'put',
    route: `api/events/${data._id}`,
  });

/**
 * Delete Event.
 * @param {EventEntity} data the Event instance to delete.
 */
export const deleteEvent = (data: EventEntity) =>
  action(EventActionTypes.DELETE.START, data, {
    method: 'delete',
    route: `api/events/${data._id}`,
  });

/**
 * Set Event.
 * @param {EventEntity} data the Event instance to set.
 */
export const setEvent = (data: EventEntity | {}) => action(EventActionTypes.SET.START, data);

/**
 * Clears Event state
 */
export const clear = () => action(EventActionTypes.CLEAR);
