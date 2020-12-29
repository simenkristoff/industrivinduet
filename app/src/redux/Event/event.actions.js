import eventTypes from './event.types';

export const addEventStart = eventData => ({
    type: eventTypes.ADD_NEW_EVENT_START,
    payload: eventData
});

export const fetchEventStart = eventID => ({
    type: eventTypes.FETCH_EVENT_START,
    payload: eventID
});

export const setEvent = event => ({
    type: eventTypes.SET_EVENT,
    payload: event
});

export const fetchEventsStart = () => ({
    type: eventTypes.FETCH_EVENTS_START
});

export const setEvents = events => ({
    type: eventTypes.SET_EVENTS,
    payload: events
});

export const updateEventStart = event => ({
    type: eventTypes.UPDATE_EVENT_START,
    payload: event
});

export const deleteEventStart = eventID => ({
    type: eventTypes.DELETE_EVENT_START,
    payload: eventID
});
