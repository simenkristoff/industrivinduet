import { action } from 'typesafe-actions';

import { ApiResponse, ContentActionTypes } from '@/types';
import contentData from '@/__mocks__/contentData';

import { contentReducer, initialState } from '../reducer';

describe('content reducer', () => {
  it('should equal initial state', () => {
    expect(contentReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(
      contentReducer(initialState, { type: ContentActionTypes.FETCH.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      contentReducer(initialState, { type: ContentActionTypes.CREATE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      contentReducer(initialState, {
        type: ContentActionTypes.UPDATE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      contentReducer(initialState, { type: ContentActionTypes.DELETE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(
      contentReducer(initialState, action(ContentActionTypes.FETCH.SUCCESS, contentData)),
    ).toEqual({
      ...initialState,
      data: contentData,
      loading: false,
    });
  });

  it('should append data on CREATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...contentData], loading: true };
    expect(
      contentReducer(currentState, action(ContentActionTypes.CREATE.SUCCESS, contentData[0])),
    ).toEqual({
      ...currentState,
      data: [...contentData, contentData[0]],
      loading: false,
    });
  });

  it('should update data on UPDATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...contentData], loading: true };
    const newContent = { ...contentData[0], name: 'Test gruppe' };
    expect(
      contentReducer(currentState, action(ContentActionTypes.UPDATE.SUCCESS, newContent)),
    ).toEqual({
      ...currentState,
      data: [newContent, ...contentData.slice(1, contentData.length)],
      loading: false,
    });
  });

  it('should remove object on DELETE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...contentData], loading: true };
    expect(
      contentReducer(currentState, action(ContentActionTypes.DELETE.SUCCESS, contentData[0])),
    ).toEqual({
      ...currentState,
      data: contentData.slice(1, contentData.length),
      loading: false,
    });
  });

  it('should set byId on SET.START', () => {
    expect(
      contentReducer(initialState, action(ContentActionTypes.SET.START, contentData[0])),
    ).toEqual({
      ...initialState,
      byId: contentData[0],
    });
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: contentData[0] };
    expect(contentReducer(currentState, action(ContentActionTypes.SET.START, {}))).toEqual({
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
      contentReducer(state, { type: ContentActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      contentReducer(state, { type: ContentActionTypes.CREATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      contentReducer(state, { type: ContentActionTypes.UPDATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      contentReducer(state, { type: ContentActionTypes.DELETE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      contentReducer(state, { type: ContentActionTypes.SET.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should clear content state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      contentReducer(state, {
        type: ContentActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
