import { action } from 'typesafe-actions';

import { ApiResponse, EventActionTypes } from '@/types';
import eventData from '@/__mocks__/eventData';

import { eventReducer, initialState } from '../reducer';

describe('event reducer', () => {
  it('should equal initial state', () => {
    expect(eventReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(
      eventReducer(initialState, { type: EventActionTypes.FETCH.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      eventReducer(initialState, { type: EventActionTypes.FETCH_ONE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      eventReducer(initialState, { type: EventActionTypes.CREATE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      eventReducer(initialState, {
        type: EventActionTypes.UPDATE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      eventReducer(initialState, { type: EventActionTypes.DELETE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(eventReducer(initialState, action(EventActionTypes.FETCH.SUCCESS, eventData))).toEqual({
      ...initialState,
      data: eventData,
      loading: false,
    });
  });
  it('should set byId on FETCH_ONE.SUCCESS', () => {
    expect(
      eventReducer(initialState, action(EventActionTypes.FETCH_ONE.SUCCESS, eventData[0])),
    ).toEqual({
      ...initialState,
      byId: eventData[0],
      loading: false,
    });
  });
  it('should append data on CREATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...eventData], loading: true };
    expect(
      eventReducer(currentState, action(EventActionTypes.CREATE.SUCCESS, eventData[0])),
    ).toEqual({
      ...currentState,
      data: [...eventData, eventData[0]],
      loading: false,
    });
  });

  it('should update data on UPDATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...eventData], loading: true };
    const newEvent = { ...eventData[0], name: 'Test gruppe' };
    expect(eventReducer(currentState, action(EventActionTypes.UPDATE.SUCCESS, newEvent))).toEqual({
      ...currentState,
      data: [newEvent, ...eventData.slice(1, eventData.length)],
      loading: false,
    });
  });

  it('should remove object on DELETE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...eventData], loading: true };
    expect(
      eventReducer(currentState, action(EventActionTypes.DELETE.SUCCESS, eventData[0])),
    ).toEqual({
      ...currentState,
      data: eventData.slice(1, eventData.length),
      loading: false,
    });
  });

  it('should set byId on SET.START', () => {
    expect(eventReducer(initialState, action(EventActionTypes.SET.START, eventData[0]))).toEqual({
      ...initialState,
      byId: eventData[0],
    });
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: eventData[0] };
    expect(eventReducer(currentState, action(EventActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
  it('should set status on all ERROR', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };
    const state = { ...initialState, loading: true };
    const expectedState = { ...initialState, loading: false, status: apiResponse };
    expect(
      eventReducer(state, { type: EventActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      eventReducer(state, { type: EventActionTypes.FETCH_ONE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      eventReducer(state, { type: EventActionTypes.CREATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      eventReducer(state, { type: EventActionTypes.UPDATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      eventReducer(state, { type: EventActionTypes.DELETE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      eventReducer(state, { type: EventActionTypes.SET.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should clear event state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      eventReducer(state, {
        type: EventActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
