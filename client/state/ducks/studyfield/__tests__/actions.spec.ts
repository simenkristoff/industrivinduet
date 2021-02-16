import { action } from 'typesafe-actions';

import { StudyFieldActionTypes, StudyFieldEntity } from '@/types';

import {
  clear,
  createStudyField,
  deleteStudyField,
  fetchStudyFields,
  setStudyField,
  updateStudyField,
} from '../actions';

import studyfieldData from './__mockData__/studyfieldData';

describe('studyfield actions', () => {
  it('should call @@studyfield.FETCH.START', () => {
    const expectedAction = action(StudyFieldActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/studyfields',
    });

    expect(fetchStudyFields()).toEqual(expectedAction);
  });

  it('should call @@studyfield.CREATE.START', () => {
    const payload: StudyFieldEntity = studyfieldData[1];
    const expectedAction = action(StudyFieldActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/studyfields`,
    });

    expect(createStudyField(payload)).toEqual(expectedAction);
  });

  it('should call @@studyfield.UPDATE.START', () => {
    const payload: StudyFieldEntity = studyfieldData[1];
    const expectedAction = action(StudyFieldActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/studyfields/${payload._id}`,
    });

    expect(updateStudyField(payload)).toEqual(expectedAction);
  });

  it('should call @@studyfield.DELETE.START', () => {
    const payload: StudyFieldEntity = studyfieldData[1];
    const expectedAction = action(StudyFieldActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/studyfields/${payload._id}`,
    });

    expect(deleteStudyField(payload)).toEqual(expectedAction);
  });

  it('should call @@studyfield.SET.START', () => {
    const payload: StudyFieldEntity = studyfieldData[1];
    const expectedAction = action(StudyFieldActionTypes.SET.START, payload);

    expect(setStudyField(payload)).toEqual(expectedAction);
  });

  it('should call @studyfield.CLEAR', () => {
    const expectedAction = action(StudyFieldActionTypes.CLEAR);

    expect(clear()).toEqual(expectedAction);
  });
});
