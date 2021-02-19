import { action } from 'typesafe-actions';

import { ApiResponse, StudyFieldActionTypes } from '@/types';
import studyfieldData from '@/__mocks__/studyfieldData';

import { studyfieldReducer, initialState } from '../reducer';

describe('studyfield reducer', () => {
  it('should equal initial state', () => {
    expect(studyfieldReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });
  it('should update loading and status on all START', () => {
    expect(
      studyfieldReducer(initialState, { type: StudyFieldActionTypes.FETCH.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      studyfieldReducer(initialState, { type: StudyFieldActionTypes.CREATE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      studyfieldReducer(initialState, {
        type: StudyFieldActionTypes.UPDATE.START,
        payload: [],
      }),
    ).toEqual({ ...initialState, loading: true, status: null });
    expect(
      studyfieldReducer(initialState, { type: StudyFieldActionTypes.DELETE.START, payload: [] }),
    ).toEqual({ ...initialState, loading: true, status: null });
  });
  it('should set data on FETCH.SUCCESS', () => {
    expect(
      studyfieldReducer(initialState, action(StudyFieldActionTypes.FETCH.SUCCESS, studyfieldData)),
    ).toEqual({
      ...initialState,
      data: studyfieldData,
      loading: false,
    });
  });

  it('should append data on CREATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...studyfieldData], loading: true };
    expect(
      studyfieldReducer(
        currentState,
        action(StudyFieldActionTypes.CREATE.SUCCESS, studyfieldData[0]),
      ),
    ).toEqual({
      ...currentState,
      data: [...studyfieldData, studyfieldData[0]],
      loading: false,
    });
  });

  it('should update data on UPDATE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...studyfieldData], loading: true };
    const newStudyField = { ...studyfieldData[0], name: 'Test gruppe' };
    expect(
      studyfieldReducer(currentState, action(StudyFieldActionTypes.UPDATE.SUCCESS, newStudyField)),
    ).toEqual({
      ...currentState,
      data: [newStudyField, ...studyfieldData.slice(1, studyfieldData.length)],
      loading: false,
    });
  });

  it('should remove object on DELETE.SUCCESS', () => {
    const currentState = { ...initialState, data: [...studyfieldData], loading: true };
    expect(
      studyfieldReducer(
        currentState,
        action(StudyFieldActionTypes.DELETE.SUCCESS, studyfieldData[0]),
      ),
    ).toEqual({
      ...currentState,
      data: studyfieldData.slice(1, studyfieldData.length),
      loading: false,
    });
  });

  it('should set byId on SET.START', () => {
    expect(
      studyfieldReducer(initialState, action(StudyFieldActionTypes.SET.START, studyfieldData[0])),
    ).toEqual({
      ...initialState,
      byId: studyfieldData[0],
    });
  });

  it('should clear byId', () => {
    const currentState = { ...initialState, byId: studyfieldData[0] };
    expect(studyfieldReducer(currentState, action(StudyFieldActionTypes.SET.START, {}))).toEqual({
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
      studyfieldReducer(state, { type: StudyFieldActionTypes.FETCH.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      studyfieldReducer(state, { type: StudyFieldActionTypes.CREATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      studyfieldReducer(state, { type: StudyFieldActionTypes.UPDATE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      studyfieldReducer(state, { type: StudyFieldActionTypes.DELETE.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
    expect(
      studyfieldReducer(state, { type: StudyFieldActionTypes.SET.ERROR, payload: apiResponse }),
    ).toEqual({ ...expectedState });
  });
  it('should clear studyfield state', () => {
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured failed',
    };
    const state = { ...initialState, status: apiResponse };
    expect(
      studyfieldReducer(state, {
        type: StudyFieldActionTypes.CLEAR,
        payload: [],
      }),
    ).toEqual({
      ...initialState,
    });
  });
});
