import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { ApiResponse, StudyFieldActionTypes } from '@/types';
import apiCaller from '@/state/utils/apiCaller';
import studyfieldData from '@/__mocks__/studyfieldData';

import {
  createStudyField,
  deleteStudyField,
  fetchStudyFields,
  setStudyField,
  updateStudyField,
} from '../actions';
import studyfieldSaga from '../sagas';

describe('studyfield saga', () => {
  it('should handle fetch success', () => {
    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), studyfieldData]])
      .put({ type: StudyFieldActionTypes.FETCH.SUCCESS, payload: studyfieldData })
      .dispatch(fetchStudyFields())
      .run();
  });

  it('should handle fetch error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: StudyFieldActionTypes.FETCH.ERROR, payload: apiResponse })
      .dispatch(fetchStudyFields())
      .run();
  });

  it('should handle create success', () => {
    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), studyfieldData[0]]])
      .put({ type: StudyFieldActionTypes.CREATE.SUCCESS, payload: studyfieldData[0] })
      .dispatch(createStudyField(studyfieldData[0]))
      .run();
  });

  it('should handle create error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: StudyFieldActionTypes.CREATE.ERROR, payload: apiResponse })
      .dispatch(createStudyField(studyfieldData[0]))
      .run();
  });

  it('should handle update success', () => {
    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), studyfieldData[0]]])
      .put({ type: StudyFieldActionTypes.UPDATE.SUCCESS, payload: studyfieldData[0] })
      .dispatch(updateStudyField(studyfieldData[0]))
      .run();
  });

  it('should handle update error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: StudyFieldActionTypes.UPDATE.ERROR, payload: apiResponse })
      .dispatch(updateStudyField(studyfieldData[0]))
      .run();
  });

  it('should handle delete success', () => {
    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), studyfieldData[0]]])
      .put({ type: StudyFieldActionTypes.DELETE.SUCCESS, payload: studyfieldData[0] })
      .dispatch(deleteStudyField(studyfieldData[0]))
      .run();
  });

  it('should handle delete error', () => {
    const error = new Error('An error occured');
    const apiResponse: ApiResponse = {
      status: 'error',
      message: 'An error occured',
    };

    return expectSaga(studyfieldSaga)
      .provide([[matchers.call.fn(apiCaller), throwError(error)]])
      .put({ type: StudyFieldActionTypes.DELETE.ERROR, payload: apiResponse })
      .dispatch(deleteStudyField(studyfieldData[0]))
      .run();
  });

  it('should handle set success', () => {
    return expectSaga(studyfieldSaga)
      .put({ type: StudyFieldActionTypes.SET.SUCCESS, payload: studyfieldData[0] })
      .dispatch(setStudyField(studyfieldData[0]))
      .run();
  });
});
