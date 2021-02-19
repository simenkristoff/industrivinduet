import { action } from 'typesafe-actions';

import { ApiResponse, MediaActionTypes } from '@/types';
import {
  mediaDirectoryMock,
  mediaDirectoryMockUpdated,
  mediaFolderMock,
  mediaImageMock,
} from '@/__mocks__/mediaData';

import { mediaReducer, initialState } from '../reducer';

describe('media reducer', () => {
  it('should equal initial state', () => {
    expect(mediaReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(
      mediaReducer(initialState, { type: MediaActionTypes.FETCH.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      mediaReducer(initialState, { type: MediaActionTypes.UPLOAD.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      mediaReducer(initialState, {
        type: MediaActionTypes.DELETE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      mediaReducer(initialState, { type: MediaActionTypes.CREATE_FOLDER.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      mediaReducer(initialState, { type: MediaActionTypes.UPDATE_FOLDER.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
  });
  it('should set directory on FETCH.SUCCESS', () => {
    expect(
      mediaReducer(initialState, action(MediaActionTypes.FETCH.SUCCESS, mediaDirectoryMock)),
    ).toEqual({
      ...initialState,
      nodes: mediaDirectoryMock,
      loading: false,
    });
  });

  it('should update node tree on UPLOAD.SUCCESS', () => {
    const currentState = { ...initialState, nodes: mediaDirectoryMock, loading: true };
    expect(
      mediaReducer(currentState, action(MediaActionTypes.UPLOAD.SUCCESS, mediaImageMock)),
    ).toEqual({
      ...currentState,
      nodes: mediaDirectoryMockUpdated,
      loading: false,
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
      mediaReducer(state, { type: MediaActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      mediaReducer(state, { type: MediaActionTypes.UPLOAD.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      mediaReducer(state, { type: MediaActionTypes.DELETE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      mediaReducer(state, { type: MediaActionTypes.CREATE_FOLDER.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      mediaReducer(state, { type: MediaActionTypes.UPDATE_FOLDER.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should clear media state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      mediaReducer(state, {
        type: MediaActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
