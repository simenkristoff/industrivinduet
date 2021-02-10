import { action } from 'typesafe-actions';
import { StudyFieldActionTypes } from '@/types';

import { fetchStudyFields } from '../actions';
import { studyfieldReducer, initialState } from '../reducer';

import studyfieldData from './__mockData__/studyfieldData';

describe('studyfield reducer', () => {
  it('reducer initial', () => {
    expect(studyfieldReducer(initialState, { type: 'no type', payload: [] })).toEqual(initialState);
  });

  it('reducer fetch start', () => {
    expect(studyfieldReducer(initialState, fetchStudyFields())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('reducer fetch success', () => {
    expect(
      studyfieldReducer(initialState, action(StudyFieldActionTypes.FETCH.SUCCESS, studyfieldData)),
    ).toEqual({
      ...initialState,
      data: studyfieldData,
    });
  });

  it('reducer create success', () => {
    const currentState = { ...initialState, data: [...studyfieldData] };
    expect(
      studyfieldReducer(
        currentState,
        action(StudyFieldActionTypes.CREATE.SUCCESS, studyfieldData[0]),
      ),
    ).toEqual({
      ...currentState,
      data: [...studyfieldData, studyfieldData[0]],
    });
  });

  it('reducer update success', () => {
    const currentState = { ...initialState, data: [...studyfieldData] };
    const newStudyField = { ...studyfieldData[0], name: 'Test gruppe' };
    expect(
      studyfieldReducer(currentState, action(StudyFieldActionTypes.UPDATE.SUCCESS, newStudyField)),
    ).toEqual({
      ...currentState,
      data: [newStudyField, ...studyfieldData.slice(1, studyfieldData.length)],
    });
  });

  it('reducer delete success', () => {
    const currentState = { ...initialState, data: [...studyfieldData] };
    expect(
      studyfieldReducer(
        currentState,
        action(StudyFieldActionTypes.DELETE.SUCCESS, studyfieldData[0]),
      ),
    ).toEqual({
      ...currentState,
      data: studyfieldData.slice(1, studyfieldData.length),
    });
  });

  it('reducer set studyfield', () => {
    expect(
      studyfieldReducer(initialState, action(StudyFieldActionTypes.SET.START, studyfieldData[0])),
    ).toEqual({
      ...initialState,
      byId: studyfieldData[0],
    });
  });

  it('reducer set studyfield to null', () => {
    const currentState = { ...initialState, byId: studyfieldData[0] };
    expect(studyfieldReducer(currentState, action(StudyFieldActionTypes.SET.START, {}))).toEqual({
      ...initialState,
    });
  });
});
