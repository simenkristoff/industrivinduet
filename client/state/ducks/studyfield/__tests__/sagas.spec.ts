import apiCaller from '@/state/utils/apiCaller';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import {
  createStudyField,
  deleteStudyField,
  fetchStudyFields,
  setStudyField,
  updateStudyField,
} from '../actions';
import studyfieldSaga from '../sagas';
import { StudyFieldActionTypes } from '../types';

import studyfieldData from './__mockData__/studyfieldData';

describe('studyfield saga', () => {
  it('handle fetch success', () => {
    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), studyfieldData]])
      .put({ type: StudyFieldActionTypes.FETCH.SUCCESS, payload: studyfieldData })
      .dispatch(fetchStudyFields())
      .run();
  });

  it('handle fetch error', () => {
    const error = new Error('fetch error');

    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: StudyFieldActionTypes.FETCH.ERROR, payload: error.message })
      .dispatch(fetchStudyFields())
      .run();
  });

  it('handle create success', () => {
    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), studyfieldData[0]]])
      .put({ type: StudyFieldActionTypes.CREATE.SUCCESS, payload: studyfieldData[0] })
      .dispatch(createStudyField(studyfieldData[0]))
      .run();
  });

  it('handle create error', () => {
    const error = new Error('create error');

    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: StudyFieldActionTypes.CREATE.ERROR, payload: error.message })
      .dispatch(createStudyField(studyfieldData[0]))
      .run();
  });

  it('handle update success', () => {
    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), studyfieldData[0]]])
      .put({ type: StudyFieldActionTypes.UPDATE.SUCCESS, payload: studyfieldData[0] })
      .dispatch(updateStudyField(studyfieldData[0]))
      .run();
  });

  it('handle update error', () => {
    const error = new Error('update error');

    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: StudyFieldActionTypes.UPDATE.ERROR, payload: error.message })
      .dispatch(updateStudyField(studyfieldData[0]))
      .run();
  });

  it('handle delete success', () => {
    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), studyfieldData[0]]])
      .put({ type: StudyFieldActionTypes.DELETE.SUCCESS, payload: studyfieldData[0] })
      .dispatch(deleteStudyField(studyfieldData[0]))
      .run();
  });

  it('handle delete error', () => {
    const error = new Error('delete error');

    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: StudyFieldActionTypes.DELETE.ERROR, payload: error.message })
      .dispatch(deleteStudyField(studyfieldData[0]))
      .run();
  });

  it('handle set success', () => {
    return expectSaga(studyfieldSaga)
      .put({ type: StudyFieldActionTypes.SET.SUCCESS, payload: studyfieldData[0] })
      .dispatch(setStudyField(studyfieldData[0]))
      .run();
  });
});
