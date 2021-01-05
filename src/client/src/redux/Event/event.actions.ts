import eventTypes from './event.types';

// Types
import { Event } from '../../types';

export const addEventStart = (eventData: Event) => ({
  type: eventTypes.ADD_NEW_EVENT_START,
  payload: eventData,
});

export const fetchEventStart = (eventID: string) => ({
  type: eventTypes.FETCH_EVENT_START,
  payload: eventID,
});

export const setEvent = (event: Event | Record<string, unknown> | undefined) => ({
  type: eventTypes.SET_EVENT,
  payload: event,
});

export const fetchEventsStart = () => ({
  type: eventTypes.FETCH_EVENTS_START,
});

export const setEvents = (events: Event[]) => ({
  type: eventTypes.SET_EVENTS,
  payload: events,
});

export const updateEventStart = (event: Event) => ({
  type: eventTypes.UPDATE_EVENT_START,
  payload: event,
});

export const deleteEventStart = (eventID: string) => ({
  type: eventTypes.DELETE_EVENT_START,
  payload: eventID,
});
