import { action } from 'typesafe-actions';

import {
  createStudyField,
  deleteStudyField,
  fetchStudyFields,
  setStudyField,
  updateStudyField,
} from '../actions';
import { StudyFieldActionTypes, StudyFieldEntity } from '../types';

import studyfieldData from './__mockData__/studyfieldData';

describe('studyfield actions', () => {
  // FETCH: Test if the correct function is called when fetching StudyFields.
  it('fetch studyfields', () => {
    const expectedAction = action(StudyFieldActionTypes.FETCH.START, [], {
      method: 'get',
      route: 'api/studyfields',
    });

    expect(fetchStudyFields()).toEqual(expectedAction);
  });

  // CREATE: Test if the correct function is called when creating a StudyField.
  it('create studyfield', () => {
    const payload: StudyFieldEntity = studyfieldData[1];
    const expectedAction = action(StudyFieldActionTypes.CREATE.START, payload, {
      method: 'post',
      route: `api/studyfields`,
    });

    expect(createStudyField(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating StudyField.
  it('update studyfield', () => {
    const payload: StudyFieldEntity = studyfieldData[1];
    const expectedAction = action(StudyFieldActionTypes.UPDATE.START, payload, {
      method: 'put',
      route: `api/studyfields/${payload._id}`,
    });

    expect(updateStudyField(payload)).toEqual(expectedAction);
  });

  // UPDATE: Test if the correct function is called when updating StudyField.
  it('delete studyfield', () => {
    const payload: StudyFieldEntity = studyfieldData[1];
    const expectedAction = action(StudyFieldActionTypes.DELETE.START, payload, {
      method: 'delete',
      route: `api/studyfields/${payload._id}`,
    });

    expect(deleteStudyField(payload)).toEqual(expectedAction);
  });

  // SET: Test if the correct function is called when setting StudyField.
  it('set studyfield', () => {
    const payload: StudyFieldEntity = studyfieldData[1];
    const expectedAction = action(StudyFieldActionTypes.SET.START, payload);

    expect(setStudyField(payload)).toEqual(expectedAction);
  });
});
