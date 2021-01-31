import { action } from 'typesafe-actions';

import { fetchEvents } from '../actions';
import { eventReducer, initialState } from '../reducer';
import { EventActionTypes } from '../types';

import eventData from './__mockData__/eventData';

describe('event reducer', () => {
  it('reducer initial', () => {
    expect(eventReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });

  it('reducer fetch start', () => {
    expect(eventReducer(initialState, fetchEvents())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('reducer fetch success', () => {
    expect(eventReducer(initialState, action(EventActionTypes.FETCH.SUCCESS, eventData))).toEqual({
      ...initialState,
      data: eventData,
    });
  });

  it('reducer create success', () => {
    const currentState = { ...initialState, data: [...eventData] };
    expect(
      eventReducer(currentState, action(EventActionTypes.CREATE.SUCCESS, eventData[0])),
    ).toEqual({
      ...currentState,
      data: [...eventData, eventData[0]],
    });
  });

  it('reducer update success', () => {
    const currentState = { ...initialState, data: [...eventData] };
    const newEvent = { ...eventData[0], name: 'Test gruppe' };
    expect(eventReducer(currentState, action(EventActionTypes.UPDATE.SUCCESS, newEvent))).toEqual({
      ...currentState,
      data: [newEvent, ...eventData.slice(1, eventData.length)],
    });
  });

  it('reducer delete success', () => {
    const currentState = { ...initialState, data: [...eventData] };
    expect(
      eventReducer(currentState, action(EventActionTypes.DELETE.SUCCESS, eventData[0])),
    ).toEqual({
      ...currentState,
      data: eventData.slice(1, eventData.length),
    });
  });

  it('reducer set event', () => {
    expect(eventReducer(initialState, action(EventActionTypes.SET.START, eventData[0]))).toEqual({
      ...initialState,
      byId: eventData[0],
    });
  });

  it('reducer set event to null', () => {
    const currentState = { ...initialState, byId: eventData[0] };
    expect(eventReducer(currentState, action(EventActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
});
